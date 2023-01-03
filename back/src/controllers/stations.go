package controllers

import "github.com/gofiber/fiber/v2"

// GET
func GetStations(c *fiber.Ctx) error {
	return c.SendString("Get all stations")
}

func GetStationById(c *fiber.Ctx) error {
	id := c.Params("id")
	return c.SendString("Get station by id: " + id)
}

// POST
func PostStation(c *fiber.Ctx) error {
	return c.SendString("Post a new station")
}
