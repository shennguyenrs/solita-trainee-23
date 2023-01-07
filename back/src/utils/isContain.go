package utils

func IsIntContain(arr []int, n int) bool {
	for _, i := range arr {
		if i == n {
			return true
		}
	}

	return false
}
