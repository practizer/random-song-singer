package handlers

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"server/models"
)

var songs = []models.Song{
	{ID: 1,Title: "Song 1",File: "/songs/song1.mp3"},
	{ID: 2,Title: "Song 2",File: "/songs/song2.mp3"},
	{ID: 3,Title: "Song 3",File: "/songs/song3.mp3"},
	{ID: 4,Title: "Song 4",File: "/songs/song4.mp3"},
	{ID: 5,Title: "Song 5",File: "/songs/song5.mp3"},
	{ID: 6,Title: "Song 6",File: "/songs/song6.mp3"},
	{ID: 7,Title: "Song 7",File: "/songs/song7.mp3"},
	{ID: 8,Title: "Song 8",File: "/songs/song8.mp3"},
	{ID: 9,Title: "Song 9",File: "/songs/song9.mp3"},
	{ID: 10,Title: "Song 10",File: "/songs/song10.mp3"},
}
func GetRandomSong(c *gin.Context){
	rand.Seed(time.Now().UnixNano())
	randomIndex := rand.Intn(len(songs))
	c.JSON(http.StatusOK,songs[randomIndex])
}