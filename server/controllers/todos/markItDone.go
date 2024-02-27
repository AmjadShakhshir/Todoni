package controllers

import (
	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/gofiber/fiber/v2"
)

func MarkItDone(c *fiber.Ctx) error {
	id := c.Params("id")
	var todo models.Todo
	database.DB.First(&todo, id)
	if todo.Title == "" {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Todo not found",
		})
	}
	todo.Completed = true
	database.DB.Save(&todo)
	return c.JSON(todo)
}
