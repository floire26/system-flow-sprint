package shared

import "github.com/gin-gonic/gin"

var (
	CompleteStat    = "Completed"
	OngoingStat     = "Ongoing"
	DueStat         = "Due"
	ValidTaskStatus = map[string]struct{}{
		CompleteStat: {},
		OngoingStat:  {},
	}
	IDTZLayoutFormat    = "2006-01-02 15:04 +0700 GMT"
	CompareLayoutFormat = "2006-01-02 15:04"
)

func ValidateTaskQueries(ctx *gin.Context) map[string]string {
	validQueries := map[string]string{
		"s":      "",
		"sortBy": "",
		"sort":   "",
		"status": "",
		"start":  "",
		"end":    "",
		"page":   "",
		"limit":  "",
	}

	for k := range validQueries {
		newV := ctx.Query(k)

		if newV != "" {
			validQueries[k] = newV
		} else {
			delete(validQueries, k)
		}
	}

	_, ok1 := validQueries["sortBy"]
	_, ok2 := validQueries["sort"]

	if !ok1 && !ok2 {
		delete(validQueries, "sortBy")
		delete(validQueries, "sort")
	}

	_, ok := validQueries["limit"]

	if !ok {
		validQueries["limit"] = "10"
	}
	_, ok = validQueries["page"]

	if !ok {
		validQueries["page"] = "1"
	}

	return validQueries
}
