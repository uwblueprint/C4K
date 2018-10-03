# Capitalize for Kids

### Setting up DB locally
Prereqs:
- homebrew
- pip

1. Install Postgres
```
$ brew install postgresql
```
2. Start Postgres
```
$ pg_ctl -D /usr/local/var/postgres start
$ postgres -V
```
3. Install python postgres
```
$ pip install -U pip
$ pip install psycopg2-binary
```
4. Run `setup_db.py` script
```
$ python setup_db.py
```
5. Verify tables were created
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
