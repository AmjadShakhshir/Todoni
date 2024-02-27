package main

import (
	"log"

	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.DBconn()

    app := fiber.New()

	app.Use(cors.New(cors.Config{
        AllowCredentials: true,
		AllowOrigins:    "http://localhost:3000",
    }))

    routes.Setup(app)

    log.Fatal(app.Listen(":8000"))
}