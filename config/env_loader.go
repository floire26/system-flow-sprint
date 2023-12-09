package config

import (
	"log"

	"github.com/spf13/viper"
)

type EnvConfig struct {
	DBHost     string `mapstructure:"DB_HOST"`
	DBUser     string `mapstructure:"DB_USER"`
	DBPassword string `mapstructure:"DB_PASSWORD"`
	DBName     string `mapstructure:"DB_NAME"`
	DBPort     string `mapstructure:"DB_PORT"`

	TimeoutDur int    `mapstructure:"TIMEOUT_DUR"`
	ServerPort string `mapstructure:"SERVER_PORT"`
}

func LoadConfig(in string) *EnvConfig {
	cfg := &EnvConfig{}

	viper.SetConfigFile(in)

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("unable to find the config file: %v", err)
		return nil
	}

	err = viper.Unmarshal(cfg)
	if err != nil {
		log.Fatalf("unable to load the environment: %v", err)
		return nil
	}

	return cfg
}
