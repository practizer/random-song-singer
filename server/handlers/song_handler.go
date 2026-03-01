package handlers

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"server/models"
)

var songs = []models.Song{
	{ID: 1,Title: "",File: "/songs/song1.mp3"},
	{ID: 2,Title: "",File: "/songs/song2.mp3"},
	{ID: 3,Title: "",File: "/songs/song3.mp3"},
	{ID: 4,Title: "",File: "/songs/song4.mp3"},
	{ID: 5,Title: "",File: "/songs/song5.mp3"},
}
func GetRandomSong(c *gin.Context){
	rand.Seed(time.Now().UnixNano())
	randomIndex := rand.Intn(len(songs))
	c.JSON(http.StatusOK,songs[randomIndex])
}
