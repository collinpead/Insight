package com.example;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v107.network.Network;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.github.cdimascio.dotenv.Dotenv;

// Personal notes:
// Use stmt.executeQuery(queryString) for SELECT statements and stmt.executeUpdate(queryString) for INSERT, UPDATE, and DELETE statements.
// Ensure the .env file is in the proper directory.
public class TwitchHourly {

    public static void main (String [] args) throws InterruptedException {
        try {
            Connection conn = ConnectPostgreSQL();
            Statement stmt = conn.createStatement();
            String sql = "SELECT name, address FROM game_list";
            ResultSet rs = stmt.executeQuery(sql);
            ArrayList<String> names = new ArrayList<String>();
            ArrayList<String> addresses = new ArrayList<String>();
            while ( rs.next() ) {
                names.add(rs.getString("name"));
                addresses.add(rs.getString("address"));
            }
            WebDriverManager.chromedriver().setup();
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--remote-allow-origins=*");
            options.addArguments("--headless");
            WebDriver driver = new ChromeDriver(options);

            DevTools devTools = ((ChromeDriver)driver).getDevTools();
            devTools.createSession();
            devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));
            // Prevent the browser from loading most images on the page.
            devTools.send(Network.setBlockedURLs(List.of("https://images-na.ssl-images-amazon.com/images/", "https://static-cdn.jtvnw.net/previews-ttv/", "https://static-cdn.jtvnw.net/ttv-boxart/", "https://static-cdn.jtvnw.net/jtv_user_pictures/", "https://m.media-amazon.com/images/", "https://s0.2mdn.net/simgad/")));

            for (int i = 0; i < addresses.size(); i++) {
                // Skip the current game if a category does not exist for it on Twitch.
                if (addresses.get(i).equals("DNE"))
                    continue;
                String db_name = names.get(i).replace("'", "''");
                String twitchUrl = "https://www.twitch.tv/directory/game/" + addresses.get(i);
                driver.get(twitchUrl);
                Thread.sleep(500);
                int numberOfViewers = 0;
                // Find the quantity of viewers for the specified game.
                try {
                    WebElement viewers = driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/main/div[1]/div[3]/div/div/div/div/div/section/div[1]/div[2]/div/div[2]/div[2]/div[1]/p"));
                    numberOfViewers = NumberOfViewers(viewers.getAttribute("title"));
                    try {
                        sql = "INSERT INTO twitch_records_hourly (id, timestamp, name, viewers) VALUES (default, LOCALTIMESTAMP, '" + db_name  + "', " + numberOfViewers + ")";
                        stmt.executeUpdate(sql);
                    } catch (Exception e) {
                        System.out.println("Unable to execute the insert query for game " + db_name);
                    }
                } catch (Exception e) {
                    System.out.println("Unable to find number of viewers for " + addresses.get(i) + ".");
                }
            }
            driver.close();
            conn.close();
        }
        catch (Exception e) {
            System.err.println( e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);
        }
    }

    //
    public static int NumberOfViewers(String viewers) {
        if (!viewers.contains("Viewer"))
            return 0;
        else {
            String[] splitString = viewers.split(" ", 2);
            String numberOfViewers = splitString[0].replaceAll(",", "");
            return Integer.parseInt(numberOfViewers);
        }
    }

    public static Connection ConnectPostgreSQL() {
        Connection conn = null;
        // Load credential variables from the .env file.
        Dotenv dotenv = Dotenv.load();
        String host = dotenv.get("host");
        String port = dotenv.get("port");
        String database = dotenv.get("database");
        String user = dotenv.get("user");
        String password = dotenv.get("password");


        // Attempt to establish a connection to the PostgreSQL database.
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager
                .getConnection("jdbc:postgresql://" + host +":" + port + "/" + database, user, password);
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);
        }
        return conn;
    }
}