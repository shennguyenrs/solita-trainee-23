package controllers

import (
	"context"
	"net/http"

	"solita_back/src/config"

	m "solita_back/src/models"

	"github.com/gofiber/fiber/v2"
	"github.com/uptrace/bun"
)

func GetStationsSuggest(c *fiber.Ctx) error {
	name := c.Query("name")
	result := []m.StationSuggest{}

	if name == "" {
		return c.Status(http.StatusOK).JSON(result)
	}

	// Start connection with database
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	if err := db.NewSelect().
		Model(&result).
		Where("LOWER(name) LIKE LOWER('?%')", bun.Safe(name)).
		Scan(ctx); err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to find the suggestion")
	}

	return c.Status(http.StatusOK).JSON(result)
}
