package main

import (
	"log"

	"github.com/floire26/system-flow-sprint/config"
	"github.com/floire26/system-flow-sprint/migration"
)

var (
	envRoute = "../.env"
)

func main() {
	cfg := config.LoadConfig(envRoute)
	db := config.InitDb(cfg)
	s := config.InitServer(db, cfg)

	if cfg.ExecMigrate == "yes" {
		migration.ExecMigrate(db)
	}

	err := s.ListenAndServe()
	log.Println("Error:", err.Error())
}
