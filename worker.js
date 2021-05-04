console.info('importing scripts...');

importScripts('resource.js');

console.info('imported scripts...');

fetch('data.json')
    .then(x => x.text())
    .then(x => console.info('worker fetched data: ' + x));