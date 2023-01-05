package libs

const (
	ASC           = "asc"
	DESC          = "desc"
	InitialLimit  = 10.0
	InitialOffset = 10.0
	InitialOrder  = "id"
	InitialSort   = ASC
)

var (
	FileJourneyPaths = [3]string{
		"../files/2021-05.csv",
		"../files/2021-06.csv",
		"../files/2021-07.csv",
	}
	FileStationPath = "../files/stations.csv"
)
