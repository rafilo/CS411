const fetch = require('node-fetch');
    // const spotify = require('./credentials');

    const getAccessToken = (req, res, next) => {
      const { code } = req.query;

      if (code) {
        const url = 'https://accounts.spotify.com/api/token';

        const data = {
          grant_type: 'authorization_code',
          code,
          client_id : '1ca6c4fa378a440881203b24132c769f', // Your client id
          client_secret : 'a9194f0771c34c8d885d64ae4c6b7c76', // Your secret
          redirect_uri : 'http://localhost:8888/callback' // Your redirect uri

        };

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        };

        const searchParams = new URLSearchParams();

        Object.keys(data).forEach(prop => {
          searchParams.set(prop, data[prop]);
        });

        fetch(url, {
          method: 'POST',
          headers,
          body: searchParams,
        })
          .then(res => res.json())
          .then(credentials => {
            req.credentials = credentials;
            next();
          })
          .catch(next);

      }
    };

    module.exports = getAccessToken;