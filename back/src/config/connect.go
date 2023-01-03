package config

import (
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
)

func Connect() (db *bun.DB) {
	localEnv := GetEnvMap()
	dsn := localEnv["DB_DSN"]

	pgdb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db = bun.NewDB(pgdb, pgdialect.New())
	db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))
	return
}
