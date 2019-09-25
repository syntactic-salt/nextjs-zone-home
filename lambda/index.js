const awsServerlessExpress = require('aws-serverless-express');
const fs = require('fs');
const url = require('url');
const pagesManifest = JSON.parse(fs.readFileSync('./pages-manifest.json').toString());
const pageEntries = Object.entries(pagesManifest);

const server = awsServerlessExpress.createServer((req, res) => {
    const parsedURL = url.parse(req.url);
    const pageEntry = pageEntries.find(([path]) => parsedURL.pathname === path);
    const file = pageEntry[1];
    const page = require(`./${file}`);

    res.setHeader('Cache-Control', 'no-cache');
    page.render(req, res);
});

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
