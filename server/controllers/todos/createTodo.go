package controllers

import (
	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	todo := models.Todo{
		Title: data["title"],
		Completed:  false,
		Content: data["content"],
	}

	database.DB.Create(&todo)

	return c.JSON(todo)
}
