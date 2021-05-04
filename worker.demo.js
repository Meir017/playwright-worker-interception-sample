const playwright = require('playwright');

async function main() {
    const browser = await playwright.chromium.launch({
        headless: false,
        devtools: true
    });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    page.on('console', event => {
        console.info(`${event.type()}: ${event.text()} (${JSON.stringify(event.location())})`);
    })

    await page.route(url => url.href.includes('main'), async route => await route.fulfill({
        path: './main.html'
    }));
    await page.route(url => url.href.includes('worker'), async route => await route.fulfill({
        path: './worker.js'
    }));
    await page.route(url => url.href.includes('data'), async route => await route.fulfill({
        path: './data.json'
    }));
    await page.route(url => url.href.includes('resource'), async route => await route.fulfill({
        path: './resource.js'
    }));

    await page.waitForTimeout(4500);

    await page.goto('https://microsoft.com/main.html');
}

main();