package main

import (
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"server/routes"
)

func main(){
	router := gin.Default()	
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173","https://random-song-singer.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.Static("/songs", "./songs")
	routes.SongRoutes(router)
	router.Run(":8000")
}