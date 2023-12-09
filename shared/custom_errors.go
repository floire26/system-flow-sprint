package shared

import "net/http"

type CustomError struct {
	Message string
	Code    int
}

func (e CustomError) Error() string {
	return e.Message
}

func ConvertError(err error) *CustomError {
	if err == nil {
		return nil
	}

	if err != nil {
		return &CustomError{"Error Unknown", http.StatusBadRequest}
	}

	return nil
}

var (
	ErrTaskNotFound          = &CustomError{"the specified task is not found", http.StatusBadRequest}
	ErrSubtaskCreationFailed = &CustomError{"subtask/s creation has failed", http.StatusInternalServerError}
	ErrTaskCreationFailed    = &CustomError{"task creation has failed", http.StatusInternalServerError}
	ErrSubtaskUpdateFailed   = &CustomError{"subtask update has failed", http.StatusInternalServerError}
	ErrTaskUpdateFailed      = &CustomError{"task update has failed", http.StatusInternalServerError}
	ErrSubtaskDeletionFailed = &CustomError{"subtask deletion has failed", http.StatusInternalServerError}
	ErrTaskDeletionFailed    = &CustomError{"task deletion has failed", http.StatusInternalServerError}
)
