package models

type Song struct {
	ID 		int 	`json:"id"`
	Title 	string 	`json:"title"`
	File   string `json:"file"`
}