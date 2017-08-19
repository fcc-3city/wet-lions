# API

Dokumentacja API aplikacji. Zapis będzie bardzo werbalny i prosty w celu uniknięcia nieporozumień.

API to tak naprawdę _middleware_ napisan nad [pomiary.gdmel.pl/rest](http://pomiary.gdmel.pl/rest).

## Wszystkie dostępne metody

**NOTE**: Wszystkie daty są w formacie [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)

URL                                                | Operacja
-------------------------------------------------- | --------------------------------------------------------------------------
/api/stations                                      | Zwraca listę stacji
/api/stations/:id                                  | Zwraca stację o podanym :id
/api/measurments/:station_id/:date                 | Zwraca pomiary stacji :station_id z dnia :date
/api/measurments/:station_id/:start_date/:end_date | Zwraca pomiary stacji :station_id zebrane pomiędzy :start_date a :end_date
<!-- /api/measurments/:station_id/:duration/:date       | Zwraca pomiary stacji :station_id zebrane w czase :duration przed :date -->
<!-- /api/measurments/:station_id/:date/:duration       | Zwraca pomiary stacji :station_id zebrane w czase :duration po :date -->

**Stacje Pomiarowe** [API doc](stations.md)

- Lista wszystkich stacji
- Status stacji oraz jej parametry

**Pomiary** [API docs](api/measurments.md)

- Wszystkie pomiary zbierane przez stacje
- Agregowanie pomiarów z przedziałów czasowych
