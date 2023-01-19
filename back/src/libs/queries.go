package libs

import (
	"github.com/uptrace/bun"
)

type TableName int

const (
	Journies TableName = iota
	Stations
)

type PaginationStruct struct {
	TableName TableName
	PageInt   int
	ShowFloat float64
	Order     string
	Sort      string
}

func PaginationQuery(q *bun.SelectQuery, f *PaginationStruct) (*bun.SelectQuery, error) {
	// Set default parameters
	if f.Order == "" {
		f.Order = InitialOrder
	}

	if f.Sort == "" {
		f.Sort = InitialSort
	}

	// Convert page to offset
	offset := (f.PageInt - 1) * int(f.ShowFloat)

	if f.TableName == Journies {
		q = q.
			ColumnExpr("j.*").
			ColumnExpr("departure.name AS departure_station_name").
			ColumnExpr("return.name AS return_station_name").
			Join("INNER JOIN stations AS departure").
			JoinOn("departure.id = j.departure_station_id").
			Join("INNER JOIN stations AS return").
			JoinOn("return.id = j.return_station_id")
	}

	q = q.
		OrderExpr("? ?", bun.Safe(f.Order), bun.Safe(f.Sort)).
		Limit(int(f.ShowFloat)).
		Offset(offset)

	return q, nil
}
