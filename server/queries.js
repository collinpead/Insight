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
    pool.query('SELECT * FROM steam_store_records WHERE date = CURRENT_DATE - 1 ORDER BY current DESC LIMIT 10',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSteamHundred = (request, response) => {
    pool.query('SELECT * FROM steam_store_records WHERE date = CURRENT_DATE - 1 ORDER BY current DESC LIMIT 100',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTwitchTen = (request, response) => {
    pool.query('SELECT * FROM twitch_records WHERE date = CURRENT_DATE - 1 ORDER BY viewers DESC LIMIT 10',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTwitchHundred = (request, response) => {
    pool.query('SELECT * FROM twitch_records WHERE date = CURRENT_DATE - 1 ORDER BY viewers DESC LIMIT 100',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getGameName = (request, response) => {
    var gameName = request.params.gameName
    pool.query(`SELECT current FROM steam_store_records WHERE name = '${gameName}' AND DATE > CURRENT_DATE - 7;`,
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
    getGameName
}