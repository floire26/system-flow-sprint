package model

import "gorm.io/gorm"

type Subtask struct {
	gorm.Model
	SubtaskName string `gorm:"type:varchar;not null"`
	Status      string `gorm:"type:varchar;not null"`
	TaskID      uint
}
