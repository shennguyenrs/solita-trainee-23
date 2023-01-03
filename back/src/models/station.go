package models

import "github.com/uptrace/bun"

type Station struct {
	bun.BaseModel `bun:"table:station,alias:s"`
	Id            int     `bun:",pk" json:"id"`
	Name          string  `bun:",notnull" json:"name"`
	Address       string  `bun:",notnull" json:"address"`
	Capacities    int     `bun:",notnull" json:"capacities"`
	X             float64 `bun:",notbull" json:"x"`
	Y             float64 `bun:",notnull" json:"y"`
}
