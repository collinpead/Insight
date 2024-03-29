# Selenium establishes a connection to the target website for scraping.
from selenium import webdriver
from selenium.webdriver.common.by import By
# Database configuration information.
from config import config
# Python postgreSQL connector library.
import psycopg2
from datetime import datetime

# Uses config parameters to establish a connection to the database.
def connect():
    connection = None
    params = config()
    print("Attempting to connect to the postgreSQL database.")
    connection = psycopg2.connect(**params)

    return connection

# Converts a string such as '100K Viewers' to the integer representation of the quantity with no alphabetical characters.
def process_viewers(viewers):
    num_viewers = viewers.split(" ")[0]
    is_viewers = viewers.split(" ")[1]

    if (is_viewers == "Viewers"):
        if ('K' in num_viewers):
            num_viewers = num_viewers.replace('K', '')
            num_viewers = float(num_viewers) * 1000

        return int(num_viewers)
    else:
        return 0

def fetch_twitch():
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
            csrs.execute("SELECT name, address FROM game_list")
            names = csrs.fetchall()

            opts = webdriver.FirefoxOptions()
            # Webdriver does not open a visible browser tab.
            opts.add_argument("--headless")
            # Webdriver only waits for the DOM content to be fully loaded.
            # opts.page_load_strategy = 'eager'
            driver = webdriver.Firefox(options=opts)

            for name in names:
                steam_name = name[0]
                url_name = name[1]
                
                # Skip if game exists on Steam, but does not exist on Twitch.
                if (url_name == 'DNE'):
                    continue
                else:
                    # Wait to allow the DOM to load
                    driver.implicitly_wait(5)
                    driver.get("https://www.twitch.tv/directory/game/" + url_name)
                    try:
                        viewers_xpath = "/html/body/div[1]/div/div[2]/div/main/div[1]/div[3]/div/div/div/div/div/section/div[1]/div[2]/div/div[2]/div[2]/div[1]/p"
                        viewers = driver.find_element(By.XPATH, viewers_xpath).text
                    except:
                        print("Could not find viewers for " + url_name)
                    else:
                        num_viewers = process_viewers(viewers)
                        csrs.execute("INSERT INTO twitch_records_hourly (id, timestamp, name, viewers) VALUES (default, LOCALTIMESTAMP, %s, %s)", (steam_name, num_viewers))
                        conn.commit()

            driver.close()
            conn.close()
            print("Twitch records session terminated.")
            
fetch_twitch()
