package database

import (
	"log"
	"os"

	"github.com/AmjadShakhshir/Todoni/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dsn = os.Getenv("DB_URL")


var DB *gorm.DB

func DBconn() {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
	log.Fatal(err)
	}
    DB = db

    db.AutoMigrate(&models.User{})
}