package shared

var (
	CompleteStat    = "completed"
	OngoingStat     = "ongoing"
	DueStat         = "due"
	ValidTaskStatus = map[string]struct{}{
		CompleteStat: {},
		OngoingStat:  {},
		DueStat:      {},
	}
	IDTZLayoutFormat    = "2006-01-02 15:04 +0700 GMT"
	CompareLayoutFormat = "2006-01-02 15:04"
)
