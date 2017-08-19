# Stacje pomiarowe

## [GET] /stations

Ta metoda jest używana aby pobrać listę wszystkich stacji które istnieją w bazie. Stacje posiadają podstawowe informacje.

**API Response**

```json
[{
    "id": 0,
    "externalId": 1,
    "name": "Dolne Miasto",
    "active": true,
    "sensors": {
      "rain": true,
      "water": true,
      "windDir": false,
      "windLevel": false
    }
  },
  {
    "id": 1,
    "externalId": 2,
    "name": "Górki Zachodnie",
    "active": true,
    "sensors": {
      "rain": true,
      "water": true,
      "windDir": false,
      "windLevel": false
    }
  }
]
```

# [GET] /stations/{:id}

Ta metoda jest używana aby pobrać informacje na temat jednej stacji.

**API Response**

```json
{
  "id": 0,
  "externalId": 1,
  "name": "Dolne Miasto",
  "active": true,
  "sensors": {
    "rain": true,
    "water": true,
    "windDir": false,
    "windLevel": false
  }
}
```
