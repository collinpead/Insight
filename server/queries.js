const { request, response } = require('express')
const creds = require('./obfuscation')


const Pool = require('pg').Pool
const pool = new Pool({
    user: creds.getUsername(),
    host: creds.getHost(),
    database: creds.getDatabase(),
    password: creds.getPassword(),
    port: 5432,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
})

const getSteamTen = (request, response) => {
    const query =`SELECT * FROM steam_store_records_hourly WHERE timestamp > LOCALTIMESTAMP - INTERVAL '1 HOUR' ORDER BY current DESC LIMIT 10`
    pool.query(query,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSteamHundred = (request, response) => {
    const query ='SELECT * FROM steam_store_records_hourly WHERE timestamp > LOCALTIMESTAMP - INTERVAL' + "'1 HOUR'" + ' ORDER BY current DESC LIMIT 100'
    pool.query(query,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTwitchTen = (request, response) => {
    const query ='SELECT * FROM twitch_records_hourly WHERE timestamp > LOCALTIMESTAMP - INTERVAL' + "'1 HOUR'" + ' ORDER BY viewers DESC LIMIT 10'
    pool.query(query,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTwitchHundred = (request, response) => {
    const query = 'SELECT * FROM twitch_records_hourly WHERE timestamp > LOCALTIMESTAMP - INTERVAL' + "'1 HOUR'" + ' ORDER BY viewers DESC LIMIT 100'
    pool.query(query,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getGamePastWeek = (request, response) => {
    var gameName = request.params.gameName
    var hours = Number(request.params.time) * 24
    const query = `SELECT current, timestamp FROM steam_store_records_hourly WHERE name = '${gameName}' AND timestamp > (LOCALTIMESTAMP - INTERVAL '${hours} HOURS') ORDER BY timestamp;`
    pool.query(query,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStreamPastWeek = (request, response) => {
    var gameName = request.params.gameName
    var hours = Number(request.params.time) * 24
    pool.query(`SELECT viewers, timestamp FROM twitch_records_hourly WHERE name = '${gameName}' AND timestamp > (LOCALTIMESTAMP - INTERVAL '${hours} HOURS') ORDER BY timestamp;`,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/* use this later maybe to fix address issues
SELECT current, peak, address, timestamp FROM steam_store_records_hourly JOIN game_list ON steam_store_records_hourly.name = '雀魂麻將(MahjongSoul)
(not available in your region)' AND game_list.name = '雀魂麻將(MahjongSoul)
(not available in your region)';*/

const getGameNames = (request, response) => {
    pool.query(`SELECT name FROM game_list;`,
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSteamTen,
    getTwitchTen,
    getSteamHundred,
    getTwitchHundred,
    getGamePastWeek,
    getStreamPastWeek,
    getGameNames
}