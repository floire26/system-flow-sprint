package config

import (
	"net/http"

	"github.com/floire26/system-flow-sprint/router"
	"gorm.io/gorm"
)

func InitServer(db *gorm.DB, cfg *EnvConfig) *http.Server {
	r := router.Setup(db)
	return &http.Server{
		Addr:    cfg.ServerPort,
		Handler: r,
		// WriteTimeout: 15 * time.Second,
		// ReadTimeout:  15 * time.Second,
	}
}
