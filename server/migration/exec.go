package migration

import (
	"github.com/floire26/system-flow-sprint/model"
	"gorm.io/gorm"
)

var (
	models = []interface{}{
		&model.Task{},
		&model.Subtask{},
	}
)

func ExecMigrate(db *gorm.DB) {
	db.Migrator().DropTable(models...)
	db.AutoMigrate(models...)
}
