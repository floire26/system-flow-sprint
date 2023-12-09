package usecase

import (
	"github.com/floire26/system-flow-sprint/repository"
	"github.com/robfig/cron/v3"
)

type taskUsecase struct {
	taskRepo  repository.TaskRepository
	scheduler *cron.Cron
}

type TaskUsecase interface {
}

func NewTaskUsecase(taskRepo repository.TaskRepository) TaskUsecase {
	return &taskUsecase{
		taskRepo:  taskRepo,
		scheduler: cron.New(),
	}
}
