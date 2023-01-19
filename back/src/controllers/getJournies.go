package controllers

import (
	"context"
	"math"
	"net/http"
	"strconv"

	"solita_back/src/config"
	"solita_back/src/libs"

	"github.com/gofiber/fiber/v2"

	m "solita_back/src/models"
	u "solita_back/src/utils"
)

func GetJournies(c *fiber.Ctx) error {
	page := c.Query("page")
	show := c.Query("show")
	order := c.Query("order_by")
	sort := c.Query("sort_by")

	// Validating pagination parameters
	raw := m.RawJourniesPagination{
		DepartureId: "1",
		ReturnId:    "1",
		Page:        page,
		Show:        show,
		Order:       order,
		Sort:        sort,
	}

	errors := u.ValidateJourniesPagination(raw)
	if errors != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid request parameters")
	}

	// Start connection with database
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	pageInt, _ := strconv.Atoi(page)
	var showFloat float64 = libs.InitialLimit

	if show != "" {
		showFloat, _ = strconv.ParseFloat(show, 64)
	}

	// Count all records
	count, error := db.NewSelect().
		Model((*m.JourneyTable)(nil)).
		Count(ctx)
	if error != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to count all records")
	}

	allPages := math.Ceil(float64(count) / showFloat)

	// Get pagination results
	var results []m.Journey
	f := libs.PaginationStruct{
		TableName: libs.Journies,
		PageInt:   pageInt,
		ShowFloat: showFloat,
		Order:     order,
		Sort:      sort,
	}

	q, err := libs.PaginationQuery(db.NewSelect().Model(&results), &f)
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to create query to get results")
	}

	if err = q.Scan(ctx); err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to get results")
	}

	returnObj := m.ReturnJournies{
		Data: results,
		Pagination: m.Pagination{
			AllPages:    int(allPages),
			CurrentPage: pageInt,
			Show:        int(showFloat),
		},
	}

	return c.Status(http.StatusOK).JSON(returnObj)
}
