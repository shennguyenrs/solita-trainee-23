package controllers

import "github.com/gofiber/fiber/v2"

// GET
func GetJournies(c *fiber.Ctx) error {
	return c.SendString("Get all journies")
}

func GetJourneyById(c *fiber.Ctx) error {
	id := c.Params("id")
	return c.SendString("Get a journey by id: " + id)
}

// POST
func PostJourney(c *fiber.Ctx) error {
	return c.SendString("Post a new journey")
}
