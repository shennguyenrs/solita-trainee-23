package routes

import (
	conf "solita_back/src/config"
	ctrl "solita_back/src/controllers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/helmet/v2"
)

func StartServer() *fiber.App {
	// Load env
	conf.LoadEnv()

	// Start router
	r := fiber.New(fiber.Config{
		AppName:       "Solita Dev API v1",
		CaseSensitive: true,
		StrictRouting: true,
	})

	// Middlewares
	r.Use(helmet.New())
	r.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))
	r.Use(recover.New())
	r.Use(compress.New())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowHeaders:     "*",
		AllowMethods:     "GET, POST",
		MaxAge:           300,
	}))

	// Routes
	v1 := r.Group("/api/v1")
	journies := v1.Group("/journies")
	station := v1.Group("/stations")
	admin := v1.Group("/admin")

	journies.Get("", ctrl.GetJournies)
	journies.Post("", ctrl.PostJourney)
	journies.Get("/:departure<int>-:return<int>", ctrl.GetJourniesBySchedule)
	journies.Get("/:id<int>", ctrl.GetJourneyById)

	station.Get("", ctrl.GetStations)
	station.Post("", ctrl.PostStation)
	station.Get("/suggest", ctrl.GetStationsSuggest)
	station.Get("/:id<int>", ctrl.GetStationById)

	admin.Post("/import-journies/:id<int>", ctrl.ImportJournies)
	admin.Post("/import-stations", ctrl.ImportStations)

	return r
}
