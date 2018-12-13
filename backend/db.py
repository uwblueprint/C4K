import psycopg2
from psycopg2.extras import RealDictCursor
import getpass
import constants
import os

hostname = "localhost"
dbname = "postgres"
user = getpass.getuser()

def get_db_connection():
    if os.getenv("DATABASE_URL"):
        return psycopg2.connect(os.getenv("DATABASE_URL"), sslmode="require")
    else:
        return psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
            hostname, dbname, user))

def execute(query, values=None, cursor_factory=None):
    con = get_db_connection()
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
        JOIN demographics ON census_division.id = demographics.census_division_id
        WHERE id={}
    """.format(census_division_id)

    return execute(query, cursor_factory=RealDictCursor)

def get_census_division_aggregate():
    query = """
        SELECT
            census_division.name    AS cd_name,
            census_division.id      AS cd_id,
            SUM(expenses)           AS total_expenses,
            SUM(client_total)       AS total_clients,
            SUM(staff_total)        AS total_staff,
            AVG(expenses)           AS avg_expenses,
            AVG(client_total)       AS avg_client,
            AVG(staff_total)        AS avg_staff
        FROM sp_census_divisions
        JOIN service_providers ON sp_census_divisions.sp_id = service_providers.id
        JOIN census_division ON sp_census_divisions.census_division_id = census_division.id
        GROUP BY cd_id, cd_name
    """
    return execute(query, cursor_factory=RealDictCursor)

def get_all_service_providers(is_user=False, is_admin=False):
    queries = [
        # admin user query
        """
        SELECT *
        FROM service_providers
        JOIN sp_locations ON service_providers.id=sp_locations.sp_id
        JOIN sp_census_divisions ON service_providers.id=sp_census_divisions.sp_id
        """,
        # regular user query
        """
        SELECT sp.id, spcd.census_division_id, sp.name, sp.website, sp.client_total, sp.staff_total, spl.address, spl.longitude, spl.latitude, spl.isMain
        FROM service_providers sp
        JOIN sp_locations spl ON sp.id=spl.sp_id
        JOIN sp_census_divisions spcd ON sp.id=spcd.sp_id
        """,
        # guest user query
        """
        SELECT sp.id, spcd.census_division_id, sp.name, sp.website, spl.address, spl.longitude, spl.latitude, spl.isMain
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

def get_service_provider(service_provider_id):
    query = """
        SELECT * FROM service_providers WHERE id={}
    """.format(service_provider_id)

    return execute(query, cursor_factory=RealDictCursor)

def update_service_provider_data(service_provider_id, data):
    query_template = """
        UPDATE service_providers
        SET {} = '{}'
        WHERE id = {}
    """
    for col, val in data.items():
        if col in constants.SERVICE_PROVIDER_FIELDS:
            query = query_template.format(col, val, service_provider_id)
            execute(query, cursor_factory=RealDictCursor)

    return data
