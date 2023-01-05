package controllers

import (
	"bufio"
	"context"
	"encoding/csv"
	"io"
	"net/http"
	"os"
	"regexp"
	"time"

	"solita_back/src/config"

	m "solita_back/src/models"
	u "solita_back/src/utils"

	"github.com/gofiber/fiber/v2"
)

func ImportJournies(c *fiber.Ctx) error {
	records := []m.JourneyTable{}
	id := c.Params("id")
	nid := int(u.ToFloat(id))

	if nid < 0 || nid > 2 {
		return c.Status(http.StatusBadRequest).SendString("Invalid id of file")
	}

	// Start connection with database
	ctx := context.Background()
	db := config.Connect()

	// Reset or create table if it not created
	if nid == 0 {
		if err := db.ResetModel(ctx, (*m.JourneyTable)(nil)); err != nil {
			return c.Status(http.StatusInternalServerError).
				SendString("Failed to reset table before insert")
		}
	}

	file, err := os.Open(fileJourneyPaths[nid])
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to open file to import")
	}

	defer file.Close()

	reader := csv.NewReader(bufio.NewReader(file))

	// Skip the header
	_, err = reader.Read()
	if err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed when reading csv file header")
	}

	// Continue the rest
	for {
		rec, err := reader.Read()
		if err == io.EOF {
			break
		}

		if err != nil {
			return c.Status(http.StatusInternalServerError).
				SendString("Failed when reading csv file content")
		}

		/* 0 Departure
		   1 Return
		   2 DepartureStationID
		   3 DepartureStationName
		   4 ReturnStationID
		   5 ReturnStationName
		   6 CoveredDistance
		   7 Duration */

		// Do not import blank distance or duration
		if rec[6] == "" || rec[7] == "" {
			continue
		}

		// Do not import distance smaller than 10m and duration smaller than 10s
		if u.ToFloat(rec[6]) <= 10 || u.ToFloat(rec[7]) <= 10 {
			continue
		}

		layoutOne := "2006-01-02T15:04:05"
		layoutTwo := "2006-01-02"
		formatOneRegexp := regexp.MustCompile(
			`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$`,
		)
		var depTime time.Time
		var rtnTime time.Time

		// Check layout of departure time
		if formatOneRegexp.MatchString(rec[0]) {
			depTime, _ = time.Parse(layoutOne, rec[0])
		} else {
			depTime, _ = time.Parse(layoutTwo, rec[0])
		}

		// Check layout of return time
		if formatOneRegexp.MatchString(rec[1]) {
			rtnTime, _ = time.Parse(layoutOne, rec[1])
		} else {
			rtnTime, _ = time.Parse(layoutTwo, rec[1])
		}

		depId := u.ToFloat(rec[2])
		rtnId := u.ToFloat(rec[4])
		distance := u.ToFloat(rec[6])
		duration := u.ToFloat(rec[7])

		row := m.JourneyTable{
			Departure:          depTime,
			Return:             rtnTime,
			DepartureStationID: int(depId),
			ReturnStationID:    int(rtnId),
			CoveredDistance:    distance,
			Duration:           duration,
		}

		records = append(records, row)
	}

	if _, err = db.NewInsert().Model(&records).Exec(ctx); err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to insert records to database")
	}

	return c.Status(http.StatusOK).
		SendString("Import journies from file to database success")
}
