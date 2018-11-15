import getpass
import os 
import sys
import io
sys.path.append("..")

import psycopg2
import pandas as pd

import constants

def create_tables(hostname, dbname, user):
    commands = [
            """
            DROP TABLE IF EXISTS demographics
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
            DROP TABLE IF EXISTS service_providers
            """,
            """
            CREATE TABLE service_providers (
                id INTEGER PRIMARY KEY,
                census_division_id INTEGER REFERENCES census_division (id),
                name TEXT NOT NULL,
                website TEXT,
                report_year INTEGER,
                report_link TEXT,
                expenses INTEGER,
                client_total INTEGER,
                staff_total INTEGER,
                address TEXT,
                notes TEXT
            )
            """
            ]

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
        print("Error {}".format(e))
        sys.exit(1)

    if con:
        con.close()

def load_census_divisions(hostname, dbname, user):
    census_division_insert_statement = """
        INSERT INTO census_division (id, name)
        VALUES ({}, '{}')
    """

    con = None
    try:
        con = psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
            hostname, dbname, user))
        cur = con.cursor()

        for i, census_division in constants.ID_TO_CENSUS_DIVISION.items():
            cur.execute(census_division_insert_statement.format(i, census_division))

        con.commit()
    except psycopg2.DatabaseError as e:
        if con:
            con.rollback()
        print("Error {}".format(e))
        sys.exit(1)

    if con:
        con.close()

def load_demographics(hostname, dbname, user):
    demographic_insert_statement = """
        INSERT INTO demographics (census_division_id, characteristic, total, male, female)
        VALUES ({}, '{}', {}, {}, {})
    """

    con = None
    try:
        con = psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
            hostname, dbname, user))

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
    data = pd.read_csv(constants.SERVICE_PROVIDER_DATA_PATH)
    data['id'] = range(1, len(data)+1)

    data.columns = ['name', 'website', 'report_year', 'report_link', 'expenses', 'client_total', 'staff_total', 'address', 'address2', 'notes', 'notes2', 'questions', 'id']
    data = data[['id', 'name', 'website', 'report_year', 'report_link', 'expenses', 'client_total', 'staff_total', 'address', 'address2', 'notes', 'notes2', 'questions']]
    data.drop(['address2', 'notes2', 'questions'], axis=1, inplace=True)


    int_columns = ['report_year', 'expenses', 'client_total', 'staff_total']
    str_columns = ['report_link', 'address', 'notes']
    data[int_columns] = data[int_columns].fillna(0)
    data[str_columns] = data[str_columns].fillna('')

    return data

def load_service_providers(hostname, dbname, user):

    query_string = """
        INSERT INTO service_providers (id, name, website, report_year, report_link, expenses, client_total, staff_total, address, notes)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    con = None
    try:
        con = psycopg2.connect("host='{}' dbname='{}' user='{}'".format(
            hostname, dbname, user))
        cur = con.cursor()

        data = clean_service_provider_data()

        for index, row in data.iterrows():
            values = tuple(row)
            cur.execute(query_string, values)

        con.commit()
    except psycopg2.DatabaseError as e:
        if con:
            con.rollback()
        print("Error {}".format(e))
        sys.exit(1)

    if con:
        con.close()

def setup_db(hostname, dbname, user):
    create_tables(hostname, dbname, user)
    load_census_divisions(hostname, dbname, user)
    load_demographics(hostname, dbname, user)
    load_service_providers(hostname, dbname, user)

if __name__ == '__main__':
    hostname = "localhost"
    dbname = "postgres"
    user = getpass.getuser()

    setup_db(hostname, dbname, user)
