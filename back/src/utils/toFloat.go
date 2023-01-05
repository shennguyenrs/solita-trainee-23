package utils

import (
	"log"
	"strconv"
)

func ToFloat(s string) (n float64) {
	n, err := strconv.ParseFloat(s, 63)
	if err != nil {
		log.Panic("Failed to convert string to float")
	}
	return
}