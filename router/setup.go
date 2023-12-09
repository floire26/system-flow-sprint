package router

import (
	"github.com/floire26/system-flow-sprint/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(middleware.ErrorHandler())
	DefineTaskRoutes(r, db)
	return r
}
