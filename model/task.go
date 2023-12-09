package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	TaskName string    `gorm:"type:varchar;not null"`
	Status   string    `gorm:"type:varchar;not null"`
	Deadline time.Time `gorm:"type:varchar;not null"`
	Subtasks []Subtask
}
