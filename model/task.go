package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	TaskName string
	Status   string
	Deadline time.Time
	Subtasks []Subtask
}
