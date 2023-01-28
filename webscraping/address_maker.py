# Database configuration information.
from config import config
# Python postgreSQL connector library.
import psycopg2

# Uses config parameters to establish a connection to the database.
def connect():
    connection = None
    params = config()
    print("Attempting to connect to the postgreSQL database.")
    connection = psycopg2.connect(**params)

    return connection

def lookup():
    conn = None
    # Connect to the postgreSQL database.
    try:
        conn = connect()
    except(Exception, psycopg2.DatabaseError) as error:
        print("Failed to connect to database.")
        print(error)
    finally:
        if conn is not None:
            # Create a cursor with the database connection.
            csrs = conn.cursor()
            print("Successfully connected to database.")

            # Acquire the records of all the 100 most played games on Steam today.
            csrs.execute("SELECT name FROM steam_store_records WHERE steam_store_records.date = CURRENT_DATE;")
            names = csrs.fetchall()

            # Empty the temporary game title table.
            csrs.execute("DELETE FROM temp_data;")
            conn.commit()

            # Twitch formatting includes symbols apostrophe, colon, comma, ampersand, and empty space.
            for name in names:
                address = name[0]
                address = address.replace("!", "")
                address = address.replace("®", "")
                address = address.replace("™", "")
                address = address.replace("’", "")

                csrs.execute("INSERT INTO temp_data (temp_name, temp_address) VALUES (%s, %s)", (name[0], address))
                conn.commit()
            
            # Insert new, unlisted game titles into the address table.
            csrs.execute("INSERT INTO sg_address (ss_name, sg_name, fk) SELECT DISTINCT temp_name, temp_address, temp_data.id FROM temp_data WHERE NOT EXISTS (SELECT ss_name FROM sg_address WHERE temp_data.temp_name = sg_address.ss_name);")
            conn.commit()

            conn.close()
            print("Address collection session terminated.")

lookup()