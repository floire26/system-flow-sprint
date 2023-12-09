package handler

import (
	"github.com/floire26/system-flow-sprint/usecase"
)

type TaskHandler struct {
	taskUc usecase.TaskUsecase
}

func NewTaskHandler(taskUc usecase.TaskUsecase) TaskHandler {
	return TaskHandler{
		taskUc: taskUc,
	}
}
