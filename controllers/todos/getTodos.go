package controllers

import (
	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/gofiber/fiber/v2"
)

func GetTodos(c *fiber.Ctx) error {
	var todos []models.Todo
	database.DB.Find(&todos)

	return c.JSON(todos)
}