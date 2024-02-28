package routes

import (
	todos "github.com/AmjadShakhshir/Todoni/controllers/todos"
	users "github.com/AmjadShakhshir/Todoni/controllers/users"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
    api := app.Group("/api/users")

    api.Get("/", users.GetUser)
    api.Post("/register", users.Register)
    api.Post("/login", users.Login)
    api.Post("/logout", users.Logout)

    apiTodos := app.Group("/api/todos")

    apiTodos.Get("/", todos.GetTodos)
    apiTodos.Post("/", todos.CreateTodo)
    apiTodos.Delete("/:id", todos.DeleteTodo)
    apiTodos.Patch("/:id/done", todos.MarkItDone)
}