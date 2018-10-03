import psycopg2
import getpass
import sys

def create_tables():
    commands = (
            """
            DROP TABLE IF EXISTS census_division
            """,
            """
            CREATE TABLE census_division (
                id   INTEGER PRIMARY KEY,
                name TEXT NOT NULL
            )
            """,
            """
            DROP TABLE IF EXISTS demographics
            """,
            """
            CREATE TABLE demographics (
                id             INTEGER PRIMARY KEY,
                characteristic TEXT NOT NULL,
                total          INTEGER NOT NULL,
                male           INTEGER NOT NULL,
                female         INTEGER NOT NULL
            )
            """
    )

    hostname = "localhost"
    dbname = "postgres"
    user = getpass.getuser()

    con = None
    try:
        con = psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
            hostname, dbname, user))
        cur = con.cursor()

        for command in commands:
            cur.execute(command)

        con.commit()
    except psycopg2.DatabaseError as e:
        if con:
            con.rollback()
        print "Error {}".format(e)
        sys.exit(1)

    if con:
        con.close()

if __name__ == '__main__':
    create_tables();
