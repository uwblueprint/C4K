# Capitalize for Kids

## POC
### Setting up DB and Server locally
Prereqs:
- homebrew
- pip
Navigate to the proof of concept directory `/POC`

1. Install Postgres
```
$ brew install postgresql
```
2. Start Postgres
```
$ pg_ctl -D /usr/local/var/postgres start
$ postgres -V
```
3. Auto-create python virtual environment and install libraries
```
$ pipenv install
```
4. Enter python virtualenv 
```
$ pipenv shell
```
5. Run `setup_db.py` script from within the "scripts" folder
```
$ pipenv run python setup_db.py
```
6. Verify tables were created
```
$ psql postgres
psql (10.5)
Type "help" for help.

postgres=# \dt
              List of relations
 Schema |      Name       | Type  |  Owner
--------+-----------------+-------+----------
 public | census_division | table | liruxuan
 public | demographics    | table | liruxuan
(2 rows)
```
7. Verify data is present
```
$ psql postgres
psql (10.5)
Type "help" for help.

postgres=# SELECT * FROM demographics;
 census_division_id |   characteristic   | total | male  | female
--------------------+--------------------+-------+-------+--------
                  1 | 0 to 4 years       |  7560 |  3820 |   3735
                  1 | 5 to 9 years       |  8190 |  4165 |   4025
                  1 | 10 to 14 years     |  8005 |  4105 |   3895
...

postgres=# select * from census_division;
 id |     name
----+--------------
  0 | Algoma
  1 | Brant
  2 | Chatham/Kent
(3 rows)
```
8. Start server
```
$ pipenv run python server.py
```
9. Send requests
```
$ curl localhost:8080/algoma
{
  "data": [
    {
      "characteristic": "0 to 4 years",
      "female": 2600,
      "male": 2715,
      "name": "Algoma",
      "total": 5320
    },
    {
      "characteristic": "5 to 9 years",
      "female": 2545,
      "male": 2815,
      "name": "Algoma",
      "total": 5360
    },
    ...
```
