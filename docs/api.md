# API

Dokumentacja API aplikacji.
Zapis będzie bardzo werbalny i prosty w celu uniknięcia nieporozumień.

API to tak naprawdę _middleware_ napisan nad [pomiary.gdmel.pl/rest](http://pomiary.gdmel.pl/rest).

## Wszystkie dostępne metody

URL               | HTTP method | Operacja
----------------- | ----------- | ---------------------------
/api/stations     | GET         | Zwraca listę stacji
/api/stations/:id | GET         | Zwraca stację o podanym :id

**Stacje Pomiarowe** [API doc](stations.md)

- Lista wszystkich stacji
- Status stacji oraz jej parametry

<!-- **Pomiary** [API docs](api/measurments.md) -->
