const {test, expect} = require('@playwright/test');
const { log } = require('console');

test('Browser Context Playwright test', async ({browser}) =>   
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles =  page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await password.click();
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
   
});



test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropDown = page.locator("select.form-control")
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test('Child windows handling', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
         ]) 

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    //console.log(await page.locator("#username").textContent());
    

});






