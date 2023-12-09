package dto

type CreateTaskRequest struct {
	TaskName string           `binding:"required"`
	Status   string           `binding:"required"`
	Deadline string           `binding:"required"`
	Subtasks []SubtaskRequest `binding:"dive"`
}

type EditTaskRequest struct {
	TaskID   uint `binding:"required,gte=1"`
	TaskName string
	Status   string
	Deadline string
	Subtasks []SubtaskRequest `binding:"dive"`
}

type SubtaskRequest struct {
	SubtaskName string `binding:"required"`
	Status      string `binding:"required"`
}
