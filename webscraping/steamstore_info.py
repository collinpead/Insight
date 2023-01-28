# Selenium establishes a connection to the target website for scraping.
from selenium import webdriver
from selenium.webdriver.common.by import By
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

def fetch_steam():
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

            opts = webdriver.FirefoxOptions()
            opts.add_argument("--headless")
            driver = webdriver.Firefox(options=opts)
            # Wait 2 seconds for the page to load the DOM.
            driver.implicitly_wait(2)
            driver.get("https://store.steampowered.com/charts/mostplayed")

            for i in range(1, 101):
                game_xpath = "/html/body/div[1]/div[7]/div[6]/div/div[4]/div/div/div/div/div[3]/table/tbody/tr[" + str(i) + "]/td[3]/a/div"
                name = str(driver.find_element(By.XPATH, game_xpath).text)
                
                game_avg_ccp_xpath = "/html/body/div[1]/div[7]/div[6]/div/div[4]/div/div/div/div/div[3]/table/tbody/tr[" + str(i) + "]/td[5]"
                current = driver.find_element(By.XPATH, game_avg_ccp_xpath).text
                current = current.replace(",", "")

                game_pk_ccp_xpath = "/html/body/div[1]/div[7]/div[6]/div/div[4]/div/div/div/div/div[3]/table/tbody/tr[" + str(i) + "]/td[6]"
                peak = driver.find_element(By.XPATH, game_pk_ccp_xpath).text
                peak = peak.replace(",", "")

                csrs.execute("INSERT INTO steam_store_records (id, date, name, current, peak) VALUES (default, CURRENT_DATE, %s, %s, %s);", (name, current, peak))
                conn.commit()
            
            conn.close()
            driver.close()
            print("Steam records session terminated.")

fetch_steam()
