# Stacje pomiarowe

## [GET] /measurments/:station_id/:date

Zwraca pomiary stacji :station_id z dnia :date

<!-- TODO: przykładowy respone -->
**API Response**
```json
[
  {
    "date": 1480508280,
        "station_id": "583d7bbbebb3ff000123f1ce",
        "temp": null,
        "water": null,
        "rain": null,
        "wind": null
  }
]
```

# [GET] /measurments/:station_id/:start_date/:end_date

Zwraca pomiary stacji :station_id zebrane pomiędzy :start_date a :end_date

<!-- TODO: przykładowy respone -->
**API Response**
```json

```
