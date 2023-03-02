package controllers

import (
	"context"
	"net/http"

	"solita_back/src/config"

	m "solita_back/src/models"
	u "solita_back/src/utils"

	"github.com/gofiber/fiber/v2"
)

func PostJourney(c *fiber.Ctx) error {
	newJourney := new(m.JourneyTable)

	if err := c.BodyParser(newJourney); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to parser request body")
	}

	// Check new id
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	// Validate new journey
	errors := u.ValidateJourney(*newJourney)
	if errors != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Invalid new station information")
	}

	_, err := db.NewInsert().Model(newJourney).Exec(ctx)
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to save new station")
	}

	return c.Status(http.StatusCreated).JSON(newJourney)
}
