package utils

import (
	"strconv"

	m "solita_back/src/models"

	"github.com/go-playground/validator"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()

func ValidateStation(station m.StationTable) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(station)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

func ValidateJourney(journey m.JourneyTable) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(journey)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

func ValidateJourniesPagination(raw m.RawJourniesPagination) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(raw)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	if len(errors) == 0 {
		departureIdInt, _ := strconv.Atoi(raw.DepartureId)
		returnIdInt, _ := strconv.Atoi(raw.ReturnId)
		pageInt, _ := strconv.Atoi(raw.Page)
		var element ErrorResponse

		if departureIdInt < 1 {
			element.FailedField = raw.DepartureId
			element.Tag = "gte=1"
			errors = append(errors, &element)
		}

		if returnIdInt < 1 {
			element.FailedField = raw.ReturnId
			element.Tag = "gte=1"
			errors = append(errors, &element)
		}

		if pageInt < 1 {
			element.FailedField = raw.Page
			element.Tag = "gte=1"
			errors = append(errors, &element)
		}

		if len(raw.Show) > 0 {
			showInt, _ := strconv.Atoi(raw.Show)
			if showInt < 1 {
				element.FailedField = raw.Show
				element.Tag = "gte=1"
				errors = append(errors, &element)
			}
		}
	}

	return errors
}

func ValidateStationsPagination(raw m.RawStationsPagination) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(raw)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	if len(errors) == 0 {
		pageInt, _ := strconv.Atoi(raw.Page)
		var element ErrorResponse
		if pageInt < 1 {
			element.FailedField = raw.Page
			element.Tag = "gte=1"
			errors = append(errors, &element)
		}

		if len(raw.Show) > 0 {
			showInt, _ := strconv.Atoi(raw.Show)
			if showInt < 1 {
				element.FailedField = raw.Show
				element.Tag = "gte=1"
				errors = append(errors, &element)
			}
		}
	}

	return errors
}
