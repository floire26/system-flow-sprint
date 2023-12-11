package model

import (
	"time"

	"gorm.io/gorm"
)

type Subtask struct {
	ID          uint           `gorm:"primarykey" json:"subtask_id"`
	SubtaskName string         `gorm:"type:varchar;not null" json:"subtask_name"`
	Status      string         `gorm:"type:varchar;not null" json:"subtask_status"`
	TaskID      uint           `json:"task_id"`
	CreatedAt   time.Time      `json:"-"`
	UpdatedAt   time.Time      `json:"-"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
