package controllers

import (
	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *fiber.Ctx) error {
    var data map[string]string

    if err := c.BodyParser(&data); err != nil {
        return err
    }

    var user models.User

    database.DB.Where("email = ?", data["email"]).First(&user) //Check the email is present in the DB

    if user.ID == 0 { //If the ID return is '0' then there is no such email present in the DB
        c.Status(fiber.StatusNotFound)
        return c.JSON(fiber.Map{
            "message": "user not found",
        })
    }

    if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
        c.Status(fiber.StatusBadRequest)
        return c.JSON(fiber.Map{
            "message": "incorrect password",
        })
    } // If the email is present in the DB then compare the Passwords and if incorrect password then return error.

    return c.JSON(user) // If Login is Successfully done return the User data.

}