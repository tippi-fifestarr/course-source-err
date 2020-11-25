// begin with a node express running app.js style page
// https://shockoe.com/ideas/development/creating-dynamic-web-pages-ejs/
let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});