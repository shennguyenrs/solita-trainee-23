package utils

import (
	"strconv"
)

func ToFloat(s string) (n float64) {
	n, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return -1
	}
	return
}
