package routes

import (
	"github.com/AmjadShakhshir/Todoni/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
    api := app.Group("/users")

    api.Get("/", controllers.GetUser)

    api.Post("/register", controllers.Register)

    api.Post("/login", controllers.Login)

    api.Post("/logout", controllers.Logout)
}