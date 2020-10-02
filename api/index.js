const express = require('express')
const app = express()
const axios = require('axios')
const axiosCookieJarSupport = require('axios-cookiejar-support').default
const tough = require('tough-cookie')

const BASE_URL = 'https://www.ahgora.com.br'

axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    authority: 'www.ahgora.com.br',
    accept: 'application/json, text/plain, */*',
    origin: 'https://mirror.www.ahgora.com.br',
    referer: 'https://mirror.www.ahgora.com.br/',
  },
  jar: cookieJar,
})

app.post('/login', async (req, res) => {
  const params = {
    empresa: 'a382748',
    origin: 'portal',
    matricula: req.query.matricula,
    senha: req.query.senha,
  }

  await axiosInstance
    .post('/externo/login', params)
    .then(() => {
      res.status(200).json(cookieJar)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

app.post('/ajuste', async (req, res) => {
  return await axiosInstance
    .post('/api-espelho/justificativas', req.body)
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

app.get('/justificativas', async (req, res) => {
  const params = {
    inicio: '2020-09-01',
    fim: '2020-09-30',
  }

  return await axiosInstance
    .get('/api-espelho/justificativas', params)
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

app.get('/apuracao', async (req, res) => {
  return await axiosInstance
    .get('/api-espelho/apuracao/2020-09')
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

module.exports = {
  path: '/api',
  handler: app,
}
