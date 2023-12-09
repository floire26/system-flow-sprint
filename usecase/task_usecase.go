package usecase

import (
	"context"
	"log"
	"time"

	"github.com/floire26/system-flow-sprint/dto"
	"github.com/floire26/system-flow-sprint/model"
	"github.com/floire26/system-flow-sprint/repository"
	"github.com/floire26/system-flow-sprint/shared"
	"github.com/robfig/cron/v3"
)

type taskUsecase struct {
	taskRepo  repository.TaskRepository
	scheduler *cron.Cron
}

type TaskUsecase interface {
	GetAllTasks(ctx context.Context, queries map[string]string) (dto.GetAllTaskResponse, error)
	GetTaskDetail(ctx context.Context, taskID uint) (model.Task, error)
	CreateTask(ctx context.Context, reqBody dto.CreateTaskRequest) (model.Task, error)
	EditTask(ctx context.Context, reqBody dto.EditTaskAndSubtasksRequest, editTaskOnly bool) (model.Task, error)
	DeleteTask(ctx context.Context, taskID uint) (model.Task, error)
	ChangeDueTasks()
}

var (
	crontab = "* * * * *"
)

func NewTaskUsecase(taskRepo repository.TaskRepository) TaskUsecase {
	return &taskUsecase{
		taskRepo:  taskRepo,
		scheduler: cron.New(),
	}
}

func (uc taskUsecase) GetAllTasks(ctx context.Context, queries map[string]string) (dto.GetAllTaskResponse, error) {
	tasks, totalCount, totalPage, err := uc.taskRepo.Find(ctx, queries)
	return dto.GetAllTaskResponse{
		TotalCount: totalCount,
		TotalPage:  totalPage,
		Tasks:      tasks,
	}, err
}

func (uc taskUsecase) GetTaskDetail(ctx context.Context, taskID uint) (model.Task, error) {
	return uc.taskRepo.First(ctx, taskID)
}

func (uc taskUsecase) CreateTask(ctx context.Context, reqBody dto.CreateTaskRequest) (model.Task, error) {
	if _, ok := shared.ValidTaskStatus[reqBody.Status]; !ok {
		return model.Task{}, shared.ErrInvalidTaskStatus
	}

	deadlineTime, err := time.Parse(shared.CompareLayoutFormat, reqBody.Deadline)

	if err != nil {
		return model.Task{}, shared.ErrInvalidDeadlineFormat
	}

	if deadlineTime.Before(time.Now()) {
		return model.Task{}, shared.ErrDeadlineBeforeNow
	}

	task := model.Task{
		TaskName: reqBody.TaskName,
		Status:   reqBody.Status,
		Deadline: deadlineTime.UTC(),
		Subtasks: []model.Subtask{},
	}

	task, err = FormatModifyTaskAndSubtask(task, reqBody.Subtasks)

	if err != nil {
		return task, err
	}

	return uc.taskRepo.Create(ctx, task)
}

func (uc taskUsecase) EditTask(ctx context.Context, reqBody dto.EditTaskAndSubtasksRequest, editTaskOnly bool) (model.Task, error) {
	if _, ok := shared.ValidTaskStatus[reqBody.Status]; !ok {
		return model.Task{}, shared.ErrInvalidTaskStatus
	}

	deadlineTime, err := time.Parse(shared.CompareLayoutFormat, reqBody.Deadline)

	if err != nil {
		return model.Task{}, shared.ErrInvalidDeadlineFormat
	}

	if deadlineTime.Before(time.Now()) {
		return model.Task{}, shared.ErrDeadlineBeforeNow
	}

	task := model.Task{
		ID:       reqBody.TaskID,
		Status:   reqBody.Status,
		TaskName: reqBody.TaskName,
		Deadline: deadlineTime.UTC(),
	}

	if editTaskOnly {
		task.Subtasks = []model.Subtask{}
		task, err = FormatModifyTaskAndSubtask(task, reqBody.Subtasks)
	}

	if err != nil {
		return task, err
	}

	return uc.taskRepo.Update(ctx, task)
}

func (uc taskUsecase) DeleteTask(ctx context.Context, taskID uint) (model.Task, error) {
	return uc.taskRepo.Delete(ctx, taskID)
}

func (uc taskUsecase) ChangeDueTasks() {
	uc.scheduler.Start()
	ctx := context.Background()
	uc.scheduler.AddFunc(crontab, func() {
		uc.taskRepo.UpdateDue(ctx)
	})
}

func FormatModifyTaskAndSubtask(task model.Task, subtasks []dto.SubtaskRequest) (model.Task, error) {
	var totStCount, compStCount int
	var hasSubstasks bool

	if len(subtasks) > 0 {
		hasSubstasks = true
	}

	task.HasSubtasks = &hasSubstasks

	for _, subtask := range subtasks {
		if _, ok := shared.ValidTaskStatus[subtask.Status]; !ok {
			return task, shared.ErrInvalidSubtaskStatus
		}

		task.Subtasks = append(task.Subtasks, model.Subtask{
			SubtaskName: subtask.SubtaskName,
			Status:      subtask.Status,
			TaskID:      task.ID,
		})

		totStCount++

		if subtask.Status == shared.CompleteStat {
			compStCount++
		}
	}

	comp := shared.CalcCompletion(compStCount, totStCount)
	log.Println(comp)
	task.Completion = &comp

	return task, nil
}
