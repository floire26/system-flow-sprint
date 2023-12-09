package dto

import "github.com/floire26/system-flow-sprint/model"

type GetAllTaskResponse struct {
	TotalCount int64        `json:"total_count"`
	TotalPage  int64        `json:"total_page"`
	Tasks      []model.Task `json:"tasks"`
}
