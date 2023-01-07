package controllers

import (
	"bufio"
	"context"
	"encoding/csv"
	"io"
	"net/http"
	"os"

	"solita_back/src/config"

	"solita_back/src/libs"
	m "solita_back/src/models"
	u "solita_back/src/utils"

	"github.com/gofiber/fiber/v2"
)

func ImportStations(c *fiber.Ctx) error {
	records := []m.StationTable{}

	// Start connection with database
	ctx := context.Background()
	db := config.Connect()
	defer db.Close()

	// Reset or create station table if it was not created
	if err := db.ResetModel(ctx, (*m.StationTable)(nil)); err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to reset table before insert")
	}

	file, err := os.Open(libs.FileStationPath)
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

	// Reading the rest
	for {
		rec, err := reader.Read()

		if err == io.EOF {
			break
		}

		if err != nil {
			return c.Status(http.StatusInternalServerError).
				SendString("Failed when reading csv file content")
		}

		/* 0 fid
		   1 id
		   2 nimi
		   3 namn
		   4 name
		   5 osoite
		   6 address
		   7 kaupunki
		   8 stad
		   9 operaattor
		   10 kapasiteet
		   11 x
		   12 y */

		idInt := int(u.ToFloat(rec[1]))
		capInt := int(u.ToFloat(rec[10]))
		xFloat := u.ToFloat(rec[11])
		yFloat := u.ToFloat(rec[12])

		if idInt == -1 || capInt == -1 || xFloat == -1 || yFloat == -1 {
			return c.Status(http.StatusInternalServerError).
				SendString("Failed to parse information from file")
		}

		row := m.StationTable{
			Id:         idInt,
			Name:       rec[4],
			Address:    rec[6],
			Capacities: capInt,
			X:          xFloat,
			Y:          yFloat,
		}

		records = append(records, row)
	}

	if _, err = db.NewInsert().Model(&records).Exec(ctx); err != nil {
		return c.Status(http.StatusInternalServerError).
			SendString("Failed to insert records to database")
	}

	return c.Status(http.StatusOK).
		SendString("Import stations from file to database success")
}
