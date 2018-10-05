import psycopg2 
from psycopg2.extras import RealDictCursor
import getpass
import constants
import getpass

hostname = "localhost"
dbname = "postgres"
user = getpass.getuser()

def get_census_division_data(census_division_id):
    query = """
        SELECT name, characteristic, total, male, female
        FROM census_division
        INNER JOIN demographics ON census_division.id = demographics.census_division_id
        WHERE id={}
    """.format(census_division_id)

    con = None
    try:
        con = psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
            hostname, dbname, user))
        cur = con.cursor(cursor_factory=RealDictCursor)

        cur.execute(query)
        rows = cur.fetchall()

        con.commit()
    except psycopg2.DatabaseError as e:
        if con:
            con.rollback()
        print "Error {}".format(e)
    
    if con:
        con.close()

    return rows
