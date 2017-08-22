# Stacje pomiarowe

## [GET] /measurments/:station_id/:date

Zwraca pomiary stacji :station_id z dnia :date

<!-- TODO: przykładowy respone -->
**API Response**
```json
[
  {
    "date": "2016-05-11 05:00:00",
    "station_id": 0,
    "temp": 20,
    "water": 2,
    "rain": 0.2,
    "wind": {
      "dir": "NE",
      "level": 1,
    }
  },
  {
    "date": "2016-05-11 06:00:00",
    "station_id": 0,
    "temp": 20,
    "water": 2,
    "rain": 0.2,
    "wind": {
      "dir": "NE",
      "level": 1,
    }
  },
  {
    "date": "2016-05-11 07:00:00",
    "station_id": 0,
    "temp": 20,
    "water": 2,
    "rain": 0.2,
    "wind": {
      "dir": "NE",
      "level": 1,
    }
  }
]
```

# [GET] /measurments/:station_id/:start_date/:end_date

Zwraca pomiary stacji :station_id zebrane pomiędzy :start_date a :end_date

<!-- TODO: przykładowy respone -->
**API Response**
```json

```
