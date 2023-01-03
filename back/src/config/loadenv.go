package config

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Panic("Failed to load .env file")
	}
}

func GetEnvMap() (localEnv map[string]string) {
	localEnv, err := godotenv.Read()
	if err != nil {
		log.Panic("Failed to load .env file")
	}

	return
}
