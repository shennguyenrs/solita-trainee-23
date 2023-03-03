package controllers

import (
	"context"
	"net/http"

	"solita_back/src/config"

	m "solita_back/src/models"
	u "solita_back/src/utils"

	"github.com/gofiber/fiber/v2"
)

func PostStation(c *fiber.Ctx) error {
	newStation := new(m.StationTable)

	if err := c.BodyParser(newStation); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to parser request body")
	}

	// Validate new station
	errors := u.ValidateStation(*newStation)
	if errors != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Invalid new station information")
	}

	// Check new id
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	found, err := db.NewSelect().
		Model((*m.StationTable)(nil)).
		Where("id = ?", newStation.Id).
		Exists(ctx)
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to check duplicate ID")
	}

	if found {
		return c.Status(http.StatusBadRequest).
			SendString("Duplidate new station id")
	}

	_, err = db.NewInsert().Model(newStation).Exec(ctx)
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to save new station")
	}

	return c.Status(http.StatusCreated).JSON(newStation)
}
