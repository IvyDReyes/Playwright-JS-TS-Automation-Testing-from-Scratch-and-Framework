const {test, expect} = require('@playwright/test');




test('@Web Client App login', async ({page}) => {

    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const email = "fakeemail3@gmail.com";
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('@Titles765753');
    await page.getByRole("button", {name: 'Login'}).click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button", {name: " Add To Cart"}).click();
    
    await page.getByRole("listitem").getByRole("button", {name: "  Cart "}).click();
    
    
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    
    await page.getByRole("button", {name:"Checkout"}).click();
    
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay: 100});
    
    await page.getByRole("button", {name:" India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.getByRole("button", {name: "ORDERS"}).click();
    await page.locator("tbody").first().waitFor("visible");
    //await page.locator(".em-spacer-1 .ng-star-inserted").click();
    //.getByRole("button",{name: "View"}).click();
    

   
  
   
});
