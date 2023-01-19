package models

import "github.com/uptrace/bun"

type StationTable struct {
	bun.BaseModel `bun:"table:stations,alias:s"`
	Id            int     `validate:"required,min=1"  bun:",pk" json:"id"`
	Name          string  `validate:"required" bun:",notnull" json:"name"`
	Address       string  `validate:"required" bun:",notnull" json:"address"`
	Capacities    int     `validate:"required,numeric" bun:",notnull" json:"capacities"`
	X             float64 `validate:"required,longitude" bun:",notnull" json:"x"`
	Y             float64 `validate:"required,latitude" bun:",notnull" json:"y"`
}

type StationSuggest struct {
	bun.BaseModel `bun:"table:stations,alias:s"`
	Id            int    `bun:",pk" json:"id"`
	Name          string `bun:",notnull" json:"name"`
}

type ReturnStations struct {
	Data       []StationTable `json:"data"`
	Pagination Pagination     `json:"pagination"`
}
