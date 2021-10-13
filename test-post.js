const axios = require('axios');


test()
    .then((data) => {
        console.log('response:', data);
        return auth();
    })
    .then((data) => {
        console.log('response:', data);
        return test2(data.access_token);
    })
    .then((data) => {
        console.log('response:', data);
        setTimeout(function () {
            // return test2(data.access_token);
        }, 3600);
    })
    ;
/**
 *
 */
function auth() {
    const params = new URLSearchParams();
    params.append('client_id', 'thom');
    params.append('client_secret', 'nightworld');
    params.append('grant_type', 'password');
    params.append('username', 'thomseddon');
    params.append('password', 'nightworld');

    return axios.request({
        method: 'POST',
        url: 'http://localhost:3000/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
    .then(function (resp) {
        return resp.data;
    })
    .catch(function (err) {
        console.error(err.response.data);
    })
    ;
}

function test() {
    return axios.request({
        method: 'GET',
        url: 'http://localhost:3000/test'
    })
    .then(function (resp) {
        return resp.data;
    })
    .catch(function (err) {
        console.error(err.response.data);
    })
    ;
}
function test2(token) {
    return axios.request({
        method: 'GET',
        url: 'http://localhost:3000/test2',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(function (resp) {
        return resp.data;
    })
    .catch(function (err) {
        console.error(err.response.data);
    })
    ;
}
