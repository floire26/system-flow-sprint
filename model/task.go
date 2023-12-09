package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	ID          uint           `gorm:"primarykey" json:"task_id"`
	TaskName    string         `gorm:"type:varchar;not null" json:"task_name"`
	Status      string         `gorm:"type:varchar;not null" json:"status"`
	HasSubtasks *bool          `gorm:"type:boolean;not null" json:"has_subtasks"`
	Completion  *int           `gorm:"type:integer;not null" json:"completion"`
	Deadline    time.Time      `gorm:"type:timestamp;not null" json:"deadline"`
	Subtasks    []Subtask      `json:"subtasks,omitempty"`
	CreatedAt   time.Time      `json:"-"`
	UpdatedAt   time.Time      `json:"-"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
