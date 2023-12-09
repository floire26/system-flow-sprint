package repository

import (
	"context"
	"fmt"
	"math"
	"strconv"
	"time"

	"github.com/floire26/system-flow-sprint/model"
	"github.com/floire26/system-flow-sprint/shared"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type taskRepository struct {
	db *gorm.DB
}

type TaskRepository interface {
	First(ctx context.Context, taskID uint) (model.Task, error)
	Find(ctx context.Context, queries map[string]string) ([]model.Task, int64, int64, error)
	Create(ctx context.Context, task model.Task) (model.Task, error)
	Update(ctx context.Context, task model.Task) (model.Task, error)
	UpdateDue(ctx context.Context) error
	Delete(ctx context.Context, taskID uint) (model.Task, error)
}

func NewTaskRepository(db *gorm.DB) TaskRepository {
	return &taskRepository{
		db: db,
	}
}

func (r taskRepository) First(ctx context.Context, taskID uint) (model.Task, error) {
	var task model.Task
	err := r.db.Preload("Subtasks").First(&task, taskID).Error

	if err != nil {
		return task, shared.ErrTaskNotFound
	}

	return task, err
}

func (r taskRepository) Find(ctx context.Context, queries map[string]string) ([]model.Task, int64, int64, error) {
	var (
		page, limit           int
		totalCount, totalPage int64
		tasks                 = []model.Task{}
		dbQuery               = r.db.WithContext(ctx).Preload("Subtasks").Model(&model.Task{}).Session(&gorm.Session{})
	)

	for k, v := range queries {
		switch k {
		case "s":
			dbQuery = dbQuery.Where("task_name ILIKE '%?%'", v)
		case "start":
			dbQuery = dbQuery.Where("created_at >= '?'::date", v)
		case "end":
			dbQuery = dbQuery.Where("created_at <= '?'::date", v)
		case "sortBy":
			dbQuery = dbQuery.Order(fmt.Sprintf("%s %s", queries["sort"], v))
		case "limit":
			limit, _ = strconv.Atoi(v)
		case "page":
			page, _ = strconv.Atoi(v)
		}
	}

	err := dbQuery.Count(&totalCount).Error

	if err != nil {
		return tasks, totalCount, totalPage, err
	}

	totalPage = int64(math.Ceil(float64(totalCount) / float64(limit)))
	offset := 0
	dbQuery = dbQuery.Limit(limit)

	if page != 0 {
		offset = limit * (page - 1)
	}

	err = dbQuery.Offset(offset).Find(&tasks).Error

	return tasks, totalCount, totalPage, err
}

func (r taskRepository) Create(ctx context.Context, task model.Task) (model.Task, error) {
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.CreateInBatches(task.Subtasks, len(task.Subtasks)).Error; err != nil {
			tx.Rollback()
			return shared.ErrSubtaskCreationFailed
		}

		if err := tx.Create(&task).Error; err != nil {
			tx.Rollback()
			return shared.ErrTaskCreationFailed
		}

		return nil
	})

	return task, err
}

func (r taskRepository) Update(ctx context.Context, task model.Task) (model.Task, error) {
	var finderTask model.Task

	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).First(&finderTask, task.ID).Error; err != nil {
			return shared.ErrTaskNotFound
		}

		if task.TaskName != "" {
			finderTask.TaskName = task.TaskName
		}

		if task.Status != "" {
			finderTask.Status = task.Status
		}

		if task.Completion != nil {
			finderTask.Completion = task.Completion
		}

		if task.HasSubtasks != nil {
			finderTask.HasSubtasks = task.HasSubtasks
		}

		if !task.Deadline.IsZero() {
			finderTask.Deadline = task.Deadline
		}

		if err := tx.Where(model.Subtask{TaskID: task.ID}).Delete(&model.Subtask{}).Error; err != nil {
			tx.Rollback()
			return shared.ErrSubtaskUpdateFailed
		}

		if err := tx.CreateInBatches(task.Subtasks, len(task.Subtasks)).Error; err != nil {
			tx.Rollback()
			return shared.ErrSubtaskUpdateFailed
		}

		finderTask.Subtasks = task.Subtasks

		if err := tx.Save(&finderTask).Error; err != nil {
			tx.Rollback()
			return shared.ErrTaskUpdateFailed
		}

		return nil
	})

	return task, err
}

func (r taskRepository) UpdateDue(ctx context.Context) error {
	currentTimestring := time.Now().UTC().Format(shared.CompareLayoutFormat)

	return r.db.WithContext(ctx).Update("status", shared.DueStat).Where("status = ?", shared.OngoingStat).Where("updated_at > ?", currentTimestring).Error
}

func (r taskRepository) Delete(ctx context.Context, taskID uint) (model.Task, error) {
	var task model.Task
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Clauses(clause.Returning{}).Where(model.Subtask{TaskID: taskID}).Delete(&model.Subtask{}).Error; err != nil {
			tx.Rollback()
			return shared.ErrSubtaskDeletionFailed
		}

		if err := tx.Clauses(clause.Returning{}).Where("id = ?", taskID).Delete(&task).Error; err != nil {
			tx.Rollback()
			return shared.ErrTaskDeletionFailed
		}

		return nil
	})

	return task, err
}
