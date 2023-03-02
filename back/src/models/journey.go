package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Journey struct {
	bun.BaseModel        `bun:"table:distinct_journies,alias:j"`
	Id                   int       `bun:",pk,autoincrement" json:"id"`
	Departure            time.Time `bun:",notnull" json:"departure"`
	Return               time.Time `bun:",notnull" json:"return"`
	DepartureStationID   int       `bun:",notnull" json:"departureStationId"`
	DepartureStationName string    `bun:",notnull" json:"departureStationName"`
	ReturnStationID      int       `bun:",notnull" json:"returnStationId"`
	ReturnStationName    string    `bun:",notnull" json:"returnStationName"`
	CoveredDistance      float64   `bun:",notnull" json:"coveredDistance"`
	Duration             float64   `bun:",notnull" json:"duration"`
}

type JourneyTable struct {
	bun.BaseModel      `bun:"table:distinct_journies,alias:j"`
	Id                 int       `validate:"omitempty" bun:",pk,autoincrement" json:"id"`
	Departure          time.Time `validate:"required" bun:",notnull" json:"departure"`
	Return             time.Time `validate:"required" bun:",notnull" json:"return"`
	DepartureStationID int       `validate:"required,numeric" bun:",notnull" json:"departureStationId"`
	ReturnStationID    int       `validate:"required,numeric" bun:",notnull" json:"returnStationId"`
	CoveredDistance    float64   `validate:"required,numeric" bun:",notnull" json:"coveredDistance"`
	Duration           float64   `validate:"required,numeric" bun:",notnull" json:"duration"`
}

type ReturnJournies struct {
	Data       []Journey  `json:"data"`
	Pagination Pagination `json:"pagination"`
}
