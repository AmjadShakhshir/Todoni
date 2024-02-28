package controllers

import (
	"log"
	"os"

	"github.com/AmjadShakhshir/Todoni/database"
	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
)

func GetUser(c *fiber.Ctx) error {
	err := godotenv.Load(".env")
        if err != nil {
            log.Fatalf("Error loading .env file")
        }
    
    var SecretKey = os.Getenv("JWT_SECRET")
	
    cookie := c.Cookies("jwt")

    token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
        return []byte(SecretKey), nil
    })

    if err != nil {
        c.Status(fiber.StatusUnauthorized)
        return c.JSON(fiber.Map{
            "message": "unauthenticated",
        })
    }

    claims := token.Claims.(*jwt.StandardClaims)

    var user models.User

    database.DB.Where("id = ?", claims.Issuer).First(&user)

    return c.JSON(user)

}