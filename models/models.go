package models

import "gorm.io/gorm"

type User struct {
    gorm.Model
    Name     string `json:"name"`
    Email    string `json:"email" gorm:"unique"`
    Password []byte `json:"-"`
}

type Todo struct {
    gorm.Model
    Title     string `json:"title"`
    Content   string `json:"content"`
    Completed bool   `json:"completed"`
}
