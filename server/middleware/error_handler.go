package middleware

import (
	"net/http"

	"github.com/floire26/system-flow-sprint/shared"
	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Next()
		if ctx.Errors.Last() != nil {

			if err, ok := ctx.Errors.Last().Err.(*shared.CustomError); ok {
				ctx.AbortWithStatusJSON(err.Code, gin.H{"error": err.Error()})
			} else {
				ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
			}

			ctx.Abort()
		}
	}
}
