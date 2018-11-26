import sys
import psycopg2
from psycopg2.extras import RealDictCursor
import getpass
sys.path.append("..")

import backend.constants as constants

hostname = "localhost"
dbname = "postgres"
user = getpass.getuser()

def execute(query, values=None, cursor_factory=None):
    con = psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
        hostname, dbname, user))
    cur = con.cursor(cursor_factory=cursor_factory)

    cur.execute(query, values)
    con.commit()

    rows = None
    if cur.description:
        rows = cur.fetchall()

    con.close()
    return rows

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
        print("Error {}".format(e))
    
    if con:
        con.close()

    return rows

def get_all_service_providers(is_user=False, is_admin=False):
    queries = [
        """
        SELECT *
        FROM service_providers
        JOIN sp_locations ON service_providers.id=sp_locations.sp_id
        JOIN sp_census_divisions ON service_providers.id=sp_census_divisions.sp_id
        """,
        """
        SELECT sp.id, spcd.census_division_id, sp.name, sp.website, spl.address, spl.longitude, spl.latitude
        FROM service_providers sp
        JOIN sp_locations spl ON sp.id=spl.sp_id
        JOIN sp_census_divisions spcd ON sp.id=spcd.sp_id
        """,
        """
        SELECT sp.id, spcd.census_division_id, sp.name, sp.website, sp.client_total, sp.staff_total, spl.address, spl.longitude, spl.latitude
        FROM service_providers sp
        JOIN sp_locations spl ON sp.id=spl.sp_id
        JOIN sp_census_divisions spcd ON sp.id=spcd.sp_id
        """
    ]

    if is_user:
        if is_admin:
            query = queries[0]
        else:
            # regular user
            query = queries[1]
    else:
        # not logged in
        query = queries[2]

    return execute(query, cursor_factory=RealDictCursor)

def get_
