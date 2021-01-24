const fs = require('fs');
const moment = require('moment');


module.exports = (config) => {

    // Add related posts
    config.addLiquidShortcode('related', (title, url) => `
        <a href="${url}" class="related">${title}</a>
    `);

    // add liquid shortcode for reusable html 
    config.addLiquidShortcode('test', (param1, param2) => `
        <p>${param1}: ${param2}</p>
    `);

    // filters
    config.addFilter('toUTCString', (date) => {
        if (date) {
            const utc = date.toUTCString();
            return moment.utc(utc).format('MMMM Do YYYY');
        } else {
            return '';
        }
    });

    // filter for favorite posts
    config.addFilter('favorites', arr => {
        // in frontmatter searching for attribute favorite=true
        const favs = p => p.data.favorite;
        return arr.filter(favs);
    });

    // filter for displaying #amount# of arr
    config.addFilter('take', (arr, amount = 2) => {
        return arr.slice(0, amount);
    });


    // browsersync config for 404 page
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {

                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync('docs/404.html');
                    // Add 404 http status code in request header.
                    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });


    // add png to get image directory with png in docs + default values
    config.setTemplateFormats([ 'png', 'html', 'liquid', 'ejs', 'md',
        'hbs', 'mustache', 'haml', 'pug', 'njk', '11ty.js' ])


    return {
        dir: {
            output: "docs"
        }
    }

};
