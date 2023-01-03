package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Journey struct {
	bun.BaseModel        `bun:"table:journey,alias:j"`
	Id                   int       `bun:",pk,autoincrement" json:"id"`
	Departure            time.Time `bun:",notnull" json:"departure"`
	Return               time.Time `bun:",notnull" json:"return"`
	DepartureStationID   int       `bun:",notnull" json:"departureStationId"`
	DepartureStationName string    `bun:",notnull" json:"departureStationName"`
	ReturnStationID      int       `bun:",notnull" json:"returnStationID"`
	ReturnStationName    string    `bun:",notnull" json:"returnStationName"`
	CoveredDistance      float64   `bun:",notnull" json:"coveredDistance"`
	Duration             float64   `bun:",notnull" json:"duration"`
}

type JourneyTable struct {
	bun.BaseModel      `bun:"table:journey,alias:j"`
	Id                 int       `bun:",pk,autoincrement" json:"id"`
	Departure          time.Time `bun:",notnull" json:"departure"`
	Return             time.Time `bun:",notnull" json:"return"`
	DepartureStationID int       `bun:",notnull" json:"departureStationId"`
	ReturnStationID    int       `bun:",notnull" json:"returnStationID"`
	CoveredDistance    float64   `bun:",notnull" json:"coveredDistance"`
	Duration           float64   `bun:",notnull" json:"duration"`
}
