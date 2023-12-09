package shared

func CalcCompletion(compStCount, totStCount int) int {
	if totStCount == 0 {
		return totStCount
	}

	return int(float32(compStCount) / float32(totStCount) * 100)
}
