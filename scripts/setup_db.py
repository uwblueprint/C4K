import getpass
import sys
import io
import psycopg2
import pandas as pd
import constants
import db

def create_tables():
    commands = [
            """
            DROP TABLE IF EXISTS demographics, sp_census_divisions, sp_locations
            """,
            """
            DROP TABLE IF EXISTS service_providers CASCADE
            """,
            """
            DROP TABLE IF EXISTS census_division CASCADE
            """,
            """
            CREATE TABLE census_division (
                id   INTEGER PRIMARY KEY,
                name TEXT NOT NULL
            )
            """,
            """
            CREATE TABLE demographics (
                census_division_id INTEGER REFERENCES census_division (id),
                characteristic     TEXT NOT NULL,
                total              INTEGER NOT NULL,
                male               INTEGER NOT NULL,
                female             INTEGER NOT NULL
            )
            """,
            """
            CREATE TABLE service_providers (
                id INTEGER         PRIMARY KEY,
                census_division_id INTEGER REFERENCES census_division (id),
                name               TEXT NOT NULL,
                website            TEXT NOT NULL,
                report_year        INTEGER,
                report_link        TEXT,
                expenses           INTEGER,
                client_total       INTEGER,
                staff_total        INTEGER,
                notes              TEXT
            )
            """,
            """
            CREATE TABLE sp_census_divisions (
                id                 INTEGER PRIMARY KEY,
                sp_id              INTEGER REFERENCES service_providers (id),
                census_division_id INTEGER REFERENCES census_division (id)
            )
            """,
            """
            CREATE TABLE sp_locations (
                id        INTEGER PRIMARY KEY,
                sp_id     INTEGER REFERENCES service_providers (id),
                address   TEXT,
                longitude DECIMAL(16,14),
                latitude  DECIMAL(16,14),
                isMain    BOOLEAN
            )
            """
            ]

    for command in commands:
        db.execute(command)

def load_census_divisions():
    census_division_insert_statement = """
        INSERT INTO census_division (id, name)
        VALUES (%s, %s)
    """

    for i, census_division in constants.ID_TO_CENSUS_DIVISION.items():
        db.execute(census_division_insert_statement, (i, census_division))

def load_demographics():
    demographic_insert_statement = """
        INSERT INTO demographics (census_division_id, characteristic, total, male, female)
        VALUES ({}, '{}', {}, {}, {})
    """

    con = None
    try:
        con = db.get_db_connection()

        for census_division, file_path in constants.CENSUS_FILE_PATH.items():
            with io.open(constants.CENSUS_DIVISION_DATA_PATH + file_path, "r", encoding="ISO-8859-1") as file_object:
                for i, line in enumerate(file_object, 1):
                    if 11 <= i <= 34:
                        data = [val.strip(" \"") for val in line.split(",")]

                        census_division_id = constants.CENSUS_DIVISION_TO_ID[census_division]
                        characteristic = data[1]
                        total = data[3]
                        male = data[5]
                        female = data[7]

                        cur = con.cursor()
                        cur.execute(demographic_insert_statement.format(
                            census_division_id,
                            characteristic,
                            total,
                            male,
                            female))

        con.commit()
    except psycopg2.DatabaseError as e:
        if con:
            con.rollback()
        print("Error {}".format(e))
        sys.exit(1)

    if con:
        con.close()

def clean_service_provider_data():
    data = pd.read_csv(
            constants.SERVICE_PROVIDER_DATA_PATH,
            skiprows=1,
            names=['name', 'website', 'report_year', 'report_link',
                'expenses', 'client_total', 'staff_total',
                'address', 'satellite_addresses',
                'coordinate', 'satellite_coordinates',
                'census_divisions',
                'notes', 'notes2', 'questions'])
    data['id'] = range(1, len(data)+1)

    # Build sp_census_division table
    sp_cd_data = []
    for index, row in data.iterrows():
        # row['census_divisions'] contains lines of CensusDivisionName,CensusDivisonID
        for cd in row['census_divisions'].split("\n"):
            census_division_id = cd.split(",")[1]
            sp_cd_data.append({
                'sp_id': row['id'],
                'census_division': census_division_id
            })
    sp_census_divisions = pd.DataFrame(sp_cd_data)
    sp_census_divisions['id'] = range(1, len(sp_census_divisions)+1)
    # Re order column
    sp_census_divisions = sp_census_divisions[['id', 'sp_id', 'census_division']]

    # Build sp_locations
    sp_location_data = []
    for index, row in data.iterrows():
        main_addr = row['address']
        # row['coordinate'] is a line LONG,LAT
        main_latlong = row['coordinate'].split(",")

        sp_location_data.append({
            'sp_id': row['id'],
            'isMain': 'true',
            'address': main_addr,
            'long': main_latlong[0],
            'lat': main_latlong[1]
        })

        if pd.isnull(row['satellite_addresses']):
            continue

        sat_addr = row['satellite_addresses'].split('\n')
        # row['satellite_coordinates'] contains lines of LONG,LAT
        sat_latlong = row['satellite_coordinates'].split('\n')
        for i in range(len(sat_addr)):
            sp_location_data.append({
                'sp_id': row['id'],
                'isMain': 'false',
                'address': sat_addr[i],
                'long': sat_latlong[i].split(',')[0],
                'lat': sat_latlong[i].split(',')[1]
            })
    sp_locations = pd.DataFrame(sp_location_data)
    sp_locations['id'] = range(1, len(sp_locations)+1)
    # Re order columns
    sp_locations = sp_locations[['id', 'sp_id', 'address', 'long', 'lat', 'isMain']]

    # Re order columns
    data = data[['id', 'name', 'website', 'report_year', 'report_link',
        'expenses', 'client_total', 'staff_total', 'notes']]

    int_columns = ['report_year', 'expenses', 'client_total', 'staff_total']
    str_columns = ['report_link', 'notes']
    data[int_columns] = data[int_columns].fillna(0)
    data[str_columns] = data[str_columns].fillna('')

    return data, sp_census_divisions, sp_locations

def load_service_providers():
    data, sp_cd, sp_loc = clean_service_provider_data()

    # Insert service provider data
    for index, row in data.iterrows():
        query_string = """
            INSERT INTO service_providers (id, name, website, report_year, report_link, expenses, client_total, staff_total, notes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = tuple(row)
        db.execute(query_string, values)

    # Insert service provider census divisions
    for index, row in sp_cd.iterrows():
        query_string = """
            INSERT INTO sp_census_divisions (id, sp_id, census_division_id)
            VALUES (%s, %s, %s)
        """
        values = tuple(row)
        db.execute(query_string, values)

    # Insert service provider locations
    for index, row in sp_loc.iterrows():
        query_string = """
            INSERT INTO sp_locations (id, sp_id, address, longitude, latitude, isMain)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = tuple(row)
        db.execute(query_string, values)

def setup_db():
    create_tables()
    load_census_divisions()
    load_demographics()
    load_service_providers()

if __name__ == '__main__':
    setup_db()
