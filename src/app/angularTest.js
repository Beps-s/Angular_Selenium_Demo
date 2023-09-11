const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

let driver;

before(async function () {
  this.timeout(30000);
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:4200/');
});

after(async function () {
  if (driver) {
    await driver.quit();
  }
});

describe('Angular Demo App Functionality', () => {
  // Test 1: Open the app and check title
  it('should open the app and validate the title', async () => {
    await driver.get('http://localhost:4200/');
    const title = await driver.getTitle();
    expect(title).to.equal('Selenium Demo');
  });

  // Test 2: Check presence of form elements
  it('should check the presence of input box and submit button', async () => {
    await driver.get('http://localhost:4200/');
    const inputBox = await driver.findElement(By.css('input[name="name"]'));
    const submitButton = await driver.findElement(
      By.css('button[type="submit"]'),
    );
    expect(await inputBox.isDisplayed()).to.be.true;
    expect(await submitButton.isDisplayed()).to.be.true;
  });

  // Test 3: Validate the Placeholder Text of the Input Box
  it('should have the correct placeholder text for the input box', async () => {
    await driver.get('http://localhost:4200/');
    const inputBox = await driver.findElement(By.css('input[name="name"]'));
    const placeholderText = await inputBox.getAttribute('placeholder');
    expect(placeholderText).to.equal('Sisestage oma nimi');
  });

  // Test 4: Submit the form
  it('should submit the form and navigate to thank you page', async () => {
    await driver.get('http://localhost:4200/');
    const inputBox = await driver.findElement(By.css('input[name="name"]'));
    await inputBox.sendKeys('Peeter');
    const submitButton = await driver.findElement(
      By.css('button[type="submit"]'),
    );
    await submitButton.click();

    await driver.sleep(1000);

    const thankYouMessage = await driver.findElement(By.css('h3')).getText();
    expect(thankYouMessage).to.equal(
      'Aitäh külastamast meie lehekülge, Peeter!',
    );
  });

  // Test 5: Navigate back to the main page from the thank you page
  it('should navigate back to the main page', async () => {
    await driver.get('http://localhost:4200/thank-you');
    const backButton = await driver.findElement(By.css('a'));
    await backButton.click();
    const title = await driver.getTitle();
    expect(title).to.equal('Selenium Demo');
  });
});
