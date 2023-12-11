package router

import (
	"github.com/floire26/system-flow-sprint/handler"
	"github.com/floire26/system-flow-sprint/repository"
	"github.com/floire26/system-flow-sprint/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DefineTaskRoutes(r *gin.Engine, db *gorm.DB) {
	var (
		taskRepo    = repository.NewTaskRepository(db)
		taskUc      = usecase.NewTaskUsecase(taskRepo)
		taskHandler = handler.NewTaskHandler(taskUc)
	)

	taskUc.ChangeDueTasks()

	r.GET("", taskHandler.HandleGetAllTasks)
	r.POST("", taskHandler.HandleCreateTask)
	r.PUT("", taskHandler.HandleEditTask)
	r.GET(":id", taskHandler.HandleGetTaskDetail)
	r.DELETE(":id", taskHandler.HandleDeleteTask)
	r.PUT("/subtasks", taskHandler.HandleEditTaskAndSubtasks)
}
