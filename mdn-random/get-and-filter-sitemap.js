const request = require('request');
const { parseString } = require('xml2js');
const fs = require('fs');

request('https://developer.mozilla.org/sitemaps/en-US/sitemap.xml ', function (error, response, body) {
    const xmlStr = body;
    parseString(xmlStr, function (err, result) {
        const allUrls = result.urlset.url;
        const urls = {
            "js": [],
            "css": []
        };
        allUrls.forEach(urlItem => {
            const url = urlItem.loc[0];
            if (url.indexOf("Web/JavaScript") > -1) {
                urls.js.push(url);
            } else if (url.indexOf("Web/CSS") > -1) {
                urls.css.push(url);
            }
        });
        fs.createWriteStream('urls.json').write(JSON.stringify({ urls }));
        console.log("Done!");
    });
});