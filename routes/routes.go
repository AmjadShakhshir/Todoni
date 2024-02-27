package routes

import (
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
    api := app.Group("/user")

    api.Get("/healthcheck", func(c *fiber.Ctx) error {
        return c.SendString("Hello World!!")
    })
}