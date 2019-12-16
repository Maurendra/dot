const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fetch = require("node-fetch");

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/provinces', async (request, response) => {
    const api_url = 'https://api.rajaongkir.com/starter/province';
    let sk = request.query.searchKey;
    let provinces = [];
    let provincesResponse = [];
    if (sk == undefined) {
        const fetch_response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'key': `0df6d5bf733214af6c6644eb8717c92c`
            }
        })
        const json = await fetch_response.json();
        response.json(json);
    } else {
        const fetch_response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'key': `0df6d5bf733214af6c6644eb8717c92c`
            }
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                provinces = responseJSON.rajaongkir.results;
            })
        provinces.map(item => {
            let tempvar = item.province.toLowerCase();
            if (tempvar.indexOf(sk.toLowerCase()) > -1) {
                provincesResponse.push(item);
            }
        });
        response.json(provincesResponse);
    }
})

app.get('/cities', async (request, response) => {
    const api_url = 'https://api.rajaongkir.com/starter/city';
    let sk = request.query.searchKey;
    let cities = [];
    let citiesResponse = [];
    if (sk == undefined) {
        const fetch_response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'key': `0df6d5bf733214af6c6644eb8717c92c`
            }
        })
        const json = await fetch_response.json();
        response.json(json);
    } else {
        const fetch_response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'key': `0df6d5bf733214af6c6644eb8717c92c`
            }
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                cities = responseJSON.rajaongkir.results;
            })
        cities.map(item => {
            let tempvar = item.city_name.toLowerCase();
            if (tempvar.indexOf(sk.toLowerCase()) > -1) {
                citiesResponse.push(item);
            }
        });
        response.json(citiesResponse);
    }
})

app.listen(port, () => {
    console.log(`Lala App running on port ${port}.`)
})