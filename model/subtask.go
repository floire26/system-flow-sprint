package model

import "gorm.io/gorm"

type Subtask struct {
	gorm.Model
	SubtaskName string
	Status      string
	TaskID      uint
}
