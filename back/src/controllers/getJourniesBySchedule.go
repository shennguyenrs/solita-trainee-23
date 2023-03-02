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

func GetJourniesBySchedule(c *fiber.Ctx) error {
	departureId := c.Params("departure")
	returnId := c.Params("return")
	page := c.Query("page")
	show := c.Query("show")
	order := c.Query("order_by")
	sort := c.Query("sort_by")

	// Validating pagination parameter
	raw := m.RawJourniesPagination{
		DepartureId: departureId,
		ReturnId:    returnId,
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
	departureIdInt, _ := strconv.Atoi(departureId)
	returnIdInt, _ := strconv.Atoi(returnId)
	var showFloat float64 = libs.InitialLimit

	if show != "" {
		showFloat, _ = strconv.ParseFloat(show, 64)
	}

	// Count all records
	count, error := db.NewSelect().
		Model((*m.JourneyTable)(nil)).
		Where("departure_station_id = ? AND return_station_id = ?", departureIdInt, returnIdInt).
		Count(ctx)
	if error != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to count all records")
	}

	allPages := math.Ceil(float64(count) / showFloat)

	// Get pagination results
	found := []m.Journey{}
	f := libs.PaginationStruct{
		TableName: libs.Journies,
		PageInt:   pageInt,
		ShowFloat: showFloat,
		Order:     order,
		Sort:      sort,
	}

	q, err := libs.PaginationQuery(
		db.NewSelect().Model(&found).
			Where("departure_station_id = ? AND return_station_id = ?", departureIdInt, returnIdInt), &f)
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to create query to get result")
	}

	if err = q.Scan(ctx); err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to find the journies in the database")
	}

	result := m.ReturnJournies{
		Data: found,
		Pagination: m.Pagination{
			AllPages:    int(allPages),
			CurrentPage: pageInt,
			Show:        int(showFloat),
		},
	}

	return c.Status(http.StatusOK).JSON(result)
}
