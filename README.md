# Solita Dev Adcademy 2023 Solution

Link to the exercise: [GitHub](https://github.com/solita/dev-academy-2023-exercise)

The technologies are used in the solution:

- Frontend: Next Js, Chakra UI
- Backend: Golang, Go Fiber
- Database: PostgreSQL
- DevOps: Docker, NGINX

### Completed functions

- Backend
  Journies:

  - [x] Get pagination journies
  - [x] Get journey by ID
  - [x] Sort or Order journies by columns
  - [x] Filter the journies based on the departure and return stations

  Stations:

  - [x] Get pagination stations
  - [x] Sort or Order stations by columns
  - [x] Get stations suggestion

  Single stations:

  - [x] Basic information
  - [x] The average distance of a journey starting from the station
  - [x] The average distance of a journey ending at the station
  - [x] Top 5 most popular return stations for journeys starting from the station
  - [x] Top 5 most popular departure stations for journeys ending at the station
  - [x] Pagination journies that departure from this stations
  - [x] Pagination journies that return at this stations
  - [x] Ability to filter all the calculations per month

- Frontend
  Journies:

  - [x] List of all journies
  - [x] Search journies using starting point and end point
  - [x] Add new journey

  Stations:

  - [x] List of all stations
  - [x] Single station view
  - [x] Search station by name
  - [x] Add new station

### How to run the application

To run the application on the local machine, there are some requirements:

- Docker is running on your machine
- Environment variables for database, backend and frontend

```
// Place in postgres/.env
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
```

```
// Place in backend/.env
DB_DSN=postgres://<POSTGRES_USER>:<POSTGRES_PASSWORD>@database:5432/<POSTGRES_DB>?sslmode=disable

```

```
// Place in frontend/.env.production
BACK_BASE_API=
FRONT_BASE_API=
GOOGLE_MAP_KEY=

```

If all prepared, the application can be run using the script:

```
sh ./run-prod.sh

```

NOTE: The backup file of database was not included in the repository. Contact me if you want to get it and put in the folder `posgrest/initdb.d`
