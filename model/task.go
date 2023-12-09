package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	TaskName    string    `gorm:"type:varchar;not null"`
	Status      string    `gorm:"type:varchar;not null"`
	HasSubtasks *bool     `gorm:"type:boolean;not null"`
	Completion  *int      `gorm:"type:integer;not null"`
	Deadline    time.Time `gorm:"type:timestamp;not null"`
	Subtasks    []Subtask
}
