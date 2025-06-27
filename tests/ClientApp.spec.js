const {test, expect} = require('@playwright/test');

test('Check the first product name', async ({page}) => {
    const email = "fakeemail3@gmail.com";
    const products = page.locator(".card-body b");
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('@Titles765753');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    //await products.first().waitFor();
    const titles = await products.allTextContents();
    console.log(titles);

});
