package controllers

import (
	"context"
	"net/http"
	"strconv"

	"solita_back/src/config"

	m "solita_back/src/models"
	u "solita_back/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/uptrace/bun"
)

type TopStationsStartingFrom struct {
	bun.BaseModel   `bun:"table:journies,alias:j"`
	ReturnStationID int    `bun:",notnull" json:"returnStationId"`
	Name            string `bun:",notnull" json:"name"`
	Total           int    `bun:",notnull" json:"total"`
}

type TopStationsEndingAt struct {
	bun.BaseModel      `bun:"table:journies,alias:j"`
	DepartureStationId int    `bun:",notnull" json:"departureStationId"`
	Name               string `bun:",notnull" json:"name"`
	Total              int    `bun:",notnull" json:"total"`
}

type AvgDistance struct {
	bun.BaseModel `bun:"table:journies,alias:j"`
	Result        float64 `bun:",notnull" json:"result"`
}

type StationAllStats struct {
	Info                     m.StationTable            `json:"info"`
	TopStationsStartingFrom  []TopStationsStartingFrom `json:"topStationsStartingFrom"`
	TopStationsEndingAt      []TopStationsEndingAt     `json:"topStationsEndingAt"`
	AvgDistancesStartingFrom float64                   `json:"avgDistancesStartingFrom"`
	AvgDistancesEndingAt     float64                   `json:"avgDistancesEndingAt"`
}

func GetStationById(c *fiber.Ctx) error {
	id := c.Params("id")
	month := c.Query("month")

	// Check valid id
	_, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Invalid id")
	}

	// Check valid month
	validMonths := []int{5, 6, 7}
	monthInt, err := strconv.Atoi(month)
	if err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Missing month or invalid month value")
	}

	if isValid := u.IsIntContain(validMonths, monthInt); !isValid {
		return c.Status(http.StatusBadRequest).
			SendString("Invalid month value")
	}

	// Start connection with database
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	// Get basic info
	var info m.StationTable
	if err := db.NewSelect().
		Model(&info).
		Where("id = ?", id).
		Scan(ctx); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to find the basic info with request id")
	}

	// Top 5 popular return stations that starting from this station
	var topStationsStartingFrom []TopStationsStartingFrom
	if err := db.NewSelect().
		ColumnExpr("j.return_station_id, s.name").
		ColumnExpr("count(*) as total").
		Model(&topStationsStartingFrom).
		Join("INNER JOIN stations AS s").
		JoinOn("s.id = j.return_station_id").
		Where("j.departure_station_id = ? AND DATE_PART('month', j.departure) = ?", id, month).
		GroupExpr("j.return_station_id, s.name").
		Order("total desc").
		Limit(5).
		Scan(ctx); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to find top 5 stations starting from the station with request id")
	}

	// Top 5 popular departure stations that endind at this station
	var topStationsEndingAt []TopStationsEndingAt
	if err := db.NewSelect().
		ColumnExpr("j.departure_station_id, s.name").
		ColumnExpr("count(*) as total").
		Model(&topStationsEndingAt).
		Join("INNER JOIN stations AS s").
		JoinOn("s.id = j.departure_station_id").
		Where("j.return_station_id = ? AND DATE_PART('month', j.return) = ?", id, month).
		GroupExpr("j.departure_station_id, s.name").
		Order("total desc").
		Limit(5).
		Scan(ctx); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to find top 5 stations ending from the station with request id")
	}

	// Avarage distances of all journies that departure from this station
	var avgDistanceDepartureFrom AvgDistance
	if err := db.NewSelect().
		ColumnExpr("AVG(covered_distance) as result").
		Model(&avgDistanceDepartureFrom).
		Where("departure_station_id = ? AND DATE_PART('month', departure) = ?", id, month).
		Scan(ctx); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to calculate the average distance of all journies that departure from the station with request id")
	}

	// Avarage distances of all journies that departure from this station
	var avgDistanceEndingAt AvgDistance
	if err := db.NewSelect().
		ColumnExpr("AVG(covered_distance) as result").
		Model(&avgDistanceEndingAt).
		Where("return_station_id = ? AND DATE_PART('month', return) = ?", id, month).
		Scan(ctx); err != nil {
		return c.Status(http.StatusBadRequest).
			SendString("Failed to calculate the average distance of all journies that return at the station with request id")
	}

	// Combine all
	all := StationAllStats{
		Info:                     info,
		TopStationsStartingFrom:  topStationsStartingFrom,
		TopStationsEndingAt:      topStationsEndingAt,
		AvgDistancesStartingFrom: avgDistanceDepartureFrom.Result,
		AvgDistancesEndingAt:     avgDistanceEndingAt.Result,
	}

	return c.Status(http.StatusOK).JSON(all)
}
