package controllers

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)


func Login(c *fiber.Ctx) error {
    var data map[string]string

    err := godotenv.Load(".env") // adjust the path according to your .env file location
        if err != nil {
            log.Fatalf("Error loading .env file")
        }
    
    var SecretKey = os.Getenv("JWT_SECRET")

    if err := c.BodyParser(&data); err != nil {
        return err
    }

    var user models.User

    database.DB.Where("email = ?", data["email"]).First(&user)

    if user.ID == 0 {
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
    }

    claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
        Issuer:    strconv.Itoa(int(user.ID)),
        ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
    })

    token, err := claims.SignedString([]byte(SecretKey))

    if err != nil {
        c.Status(fiber.StatusInternalServerError)
        return c.JSON(fiber.Map{
            "message": "could not login",
        })
    }

    cookie := fiber.Cookie{
        Name:     "jwt",
        Value:    token,
        Expires:  time.Now().Add(time.Hour * 24),
        HTTPOnly: true,
    }

    c.Cookie(&cookie)

    return c.JSON(fiber.Map{
        "message": "success",
    })
}