package models

type Pagination struct {
	AllPages    int `json:"allPages"`
	CurrentPage int `json:"currentPage"`
	Show        int `json:"show"`
}

type RawJourniesPagination struct {
	DepartureId string `validate:"required,numeric"`
	ReturnId    string `validate:"required,numeric"`
	Page        string `validate:"required,numeric"`
	Show        string `validate:"omitempty,numeric"`
	Order       string `validate:"omitempty,oneof=id departure return departure_station_id departure_station_name return_station_id return_station_name covered_distance duration"`
	Sort        string `validate:"omitempty,oneof=asc desc"`
}

type RawStationsPagination struct {
	Page  string `validate:"required,numeric"`
	Show  string `validate:"omitempty,numeric"`
	Order string `validate:"omitempty,oneof=id name address capacities x y"`
	Sort  string `validate:"omitempty,oneof=asc desc"`
}

type JourniesFilterByStationPagination struct {
	StationId string `validate:"required,numeric"`
	Month     string `validate:"required,numeric,oneof=5 6 7"`
	Page      string `validate:"required,numeric"`
	Show      string `validate:"omitempty,numeric"`
	Order     string `validate:"omitempty,oneof=id name address capacities x y"`
	Sort      string `validate:"omitempty,oneof=asc desc"`
}
