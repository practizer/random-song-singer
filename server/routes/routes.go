package routes

import (
	"github.com/gin-gonic/gin"
	"server/handlers"
)

func SongRoutes(router *gin.Engine){
	router.GET("/random-song",handlers.GetRandomSong)
}
