package handler

import (
	"github.com/floire26/system-flow-sprint/dto"
	"github.com/floire26/system-flow-sprint/shared"
	"github.com/floire26/system-flow-sprint/usecase"
	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	taskUc usecase.TaskUsecase
}

func NewTaskHandler(taskUc usecase.TaskUsecase) TaskHandler {
	return TaskHandler{
		taskUc: taskUc,
	}
}

func (h TaskHandler) HandleGetAllTasks(ctx *gin.Context) {
	queries := shared.ValidateTaskQueries(ctx)

	resBody, err := h.taskUc.GetAllTasks(ctx.Request.Context(), queries)

	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.JSON(200, gin.H{"data": resBody})
}

func (h TaskHandler) HandleTaskDetail(ctx *gin.Context) {
	taskID := ctx.GetUint("id")

	resBody, err := h.taskUc.GetTaskDetail(ctx.Request.Context(), taskID)

	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.JSON(200, gin.H{"data": resBody})
}

func (h TaskHandler) HandleDeleteTask(ctx *gin.Context) {
	taskID := ctx.GetUint("id")

	resBody, err := h.taskUc.DeleteTask(ctx.Request.Context(), taskID)

	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.JSON(200, gin.H{"data": resBody})
}

func (h TaskHandler) HandleCreateTask(ctx *gin.Context) {
	var reqBody dto.CreateTaskRequest

	err := ctx.ShouldBindJSON(&reqBody)

	if err != nil {
		ctx.Error(shared.ErrRequiredFieldsMissing)
		return
	}

	resBody, err := h.taskUc.CreateTask(ctx.Request.Context(), reqBody)

	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.JSON(201, gin.H{"data": resBody})
}

func (h TaskHandler) HandleEditTask(ctx *gin.Context) {
	var reqBody dto.EditTaskAndSubtasksRequest

	err := ctx.ShouldBindJSON(&reqBody)

	if err != nil {
		ctx.Error(shared.ErrRequiredFieldsMissing)
		return
	}

	resBody, err := h.taskUc.EditTask(ctx.Request.Context(), reqBody, true)

	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.JSON(200, gin.H{"data": resBody})
}

func (h TaskHandler) HandleEditTaskAndSubtasks(ctx *gin.Context) {
	var reqBody dto.EditTaskAndSubtasksRequest

	err := ctx.ShouldBindJSON(&reqBody)

	if err != nil {
		ctx.Error(shared.ErrRequiredFieldsMissing)
		return
	}

	resBody, err := h.taskUc.EditTask(ctx.Request.Context(), reqBody, true)

	if err != nil {
		ctx.Error(err)
		return
	}

	ctx.JSON(200, gin.H{"data": resBody})
}
