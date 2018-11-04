import getpass
import pandas as pd
import psycopg2
import sys

def create_table(hostname, dbname, user):
    commands = [
            """
            DROP TABLE IF EXISTS service_providers
            """,
            """
            CREATE TABLE service_providers (
                id INTEGER PRIMARY KEY,
                census_division_id INTEGER,
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

def clean_service_provider_data():
    filename = "service_provider_data.csv"
    data = pd.read_csv(filename)
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

if __name__ == '__main__':
    hostname = "localhost"
    dbname = "postgres"
    user = getpass.getuser()

    create_table(hostname, dbname, user)
    load_service_providers(hostname, dbname, user)
