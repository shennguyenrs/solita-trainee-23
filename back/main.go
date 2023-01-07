package main

import "solita_back/src/routes"

func main() {
	app := routes.StartServer()
	app.Listen(":3001")
}
