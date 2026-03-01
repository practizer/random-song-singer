package main

import (
	"github.com/gin-gonic/gin"
	"server/routes"
)

func main(){
	router := gin.Default()	
	routes.SongRoutes(router)
	router.Run(":8000")
}