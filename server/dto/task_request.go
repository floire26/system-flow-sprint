package dto

type CreateTaskRequest struct {
	TaskName string           `json:"task_name" binding:"required"`
	Status   string           `json:"task_status" binding:"required"`
	Deadline string           `json:"deadline" binding:"required"`
	Subtasks []SubtaskRequest `json:"subtasks" binding:"dive"`
}

type EditTaskAndSubtasksRequest struct {
	TaskID   uint             `json:"task_id" binding:"required,gte=1"`
	TaskName string           `json:"task_name"`
	Status   string           `json:"task_status" `
	Deadline string           `json:"deadline" `
	Subtasks []SubtaskRequest `json:"subtasks" binding:"dive"`
}

type SubtaskRequest struct {
	SubtaskName string `binding:"required" json:"subtask_name"`
	Status      string `binding:"required" json:"subtask_status"`
}
