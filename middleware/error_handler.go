package middleware

import (
	"net/http"

	"github.com/floire26/system-flow-sprint/shared"
	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		if c.Errors.Last() != nil {

			if err, ok := c.Errors.Last().Err.(*shared.CustomError); ok {
				c.AbortWithStatusJSON(err.Code, gin.H{"error": err.Error()})
			} else {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
			}

			c.Abort()
		}
	}
}
