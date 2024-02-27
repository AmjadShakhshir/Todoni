package database

import (
	"fmt"
	"log"
	"os"

	"github.com/AmjadShakhshir/Todoni/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func dbConfig() string {
    err := godotenv.Load(".env") // adjust the path according to your .env file location
    if err != nil {
        log.Fatalf("Error loading .env file")
    }
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, port)
	return dsn
}

var DB *gorm.DB

func DBconn() {
	dsn := dbConfig()
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
	log.Fatal(err)
	}
		DB = db

    db.AutoMigrate(&models.User{})
}