package controllers

import (
	"context"
	"net/http"
	"strconv"

	"solita_back/src/config"

	"github.com/gofiber/fiber/v2"

	m "solita_back/src/models"
)

func GetJourneyById(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Invalid id")
	}

	// Start database connection
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	var result []m.JourneyTable

	err = db.NewSelect().Model(&result).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to find the record in the database")
	}

	return c.Status(http.StatusOK).JSON(result)
}
