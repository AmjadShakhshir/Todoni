package main

import (
	"log"

	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	database.DBconn()

    app := fiber.New()

    routes.Setup(app)

    log.Fatal(app.Listen(":8000"))
}