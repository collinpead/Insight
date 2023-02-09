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

    if ('K' in num_viewers):
        num_viewers = num_viewers.replace('K', '')
        num_viewers = float(num_viewers) * 1000

    return int(num_viewers)

# Slay ghosts processes games flagged for low viewership for data integrity.
# If 0 people are currently streaming a game, selenium will fetch the number of followers instead of the number of viewers.
# This causes fradulent viewership in the twitch records table.
# Slay ghosts corrects the fradulent viewership, while preserving runtime by only checking flagged games.
def slay_ghosts():
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
            csrs.execute("SELECT ss_name, sg_name FROM sg_address WHERE low_views_flag = true")
            names = csrs.fetchall()

            opts = webdriver.FirefoxOptions()
            opts.add_argument("--headless")
            driver = webdriver.Firefox(options=opts)

            for name in names:
                steam_name = name[0]
                name = name[1].replace("_", " ")
                # Skip if game exists on Steam, but does not exist on Twitch.
                if (name == 'DNE'):
                    continue
                else:
                    viewers = ""
                    # Wait to allow the DOM to load
                    driver.implicitly_wait(5)
                    driver.get("https://www.twitch.tv/directory/game/" + name)
                    try:
                        ghost_town_xpath = "/html/body/div[1]/div/div[2]/div/main/div[1]/div[3]/div/div/div/div/div/section/div[4]/div/h3"
                        driver.find_element(By.XPATH, ghost_town_xpath).text
                    except:
                        try:
                            viewers_xpath = "/html/body/div[1]/div/div[2]/div/main/div[1]/div[3]/div/div/div/div/div/section/div[1]/div[2]/div/div[2]/div[2]/div[1]/p"
                            viewers = driver.find_element(By.XPATH, viewers_xpath).text
                        except:
                            print("Could not find viewers for " + name)
                        else:
                            num_viewers = process_viewers(viewers)
                            csrs.execute("UPDATE twitch_records SET viewers = %s WHERE name = %s", (num_viewers, steam_name))
                            conn.commit()
                    else:
                        csrs.execute("UPDATE twitch_records SET viewers = %s WHERE name = %s", (0, steam_name))
                        conn.commit()

            driver.close()
            conn.close()
            print("Ghosts have been slain.")

slay_ghosts()