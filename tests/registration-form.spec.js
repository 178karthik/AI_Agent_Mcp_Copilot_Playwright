// @ts-check
const { test, expect } = require('@playwright/test');

test('Registration form test', async ({ page }) => {
  // Navigate to the reservation app
  await page.goto('https://d1uh9e7cu07ukd.cloudfront.net/selenium-docker/reservation-app/index.html');
  
  // Verify page title
  await expect(page).toHaveTitle('Book Your Flights');
  // Fill the registration form using the correct selectors
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');
  await page.getByPlaceholder("selenium@docker.com").fill('johndoe178@gmail.com');
  await page.locator('#password').fill('password123');
  await page.locator('input[placeholder="1234 Main St"]').fill('123 Test Street');
  await page.locator('input[name="city"]').fill('Test City');
  
  // Select state from dropdown
  await page.locator('#inputState').selectOption('California');
  
  // Fill the zip code
  await page.locator('input[name="zip"]').fill('12345');
    // Click the register button
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Wait for registration confirmation
  const confirmationHeading = page.getByRole('heading', { name: 'Registration Confirmation' });
  await expect(confirmationHeading).toBeVisible({ timeout: 5000 });
  
  // Verify success message is displayed
  const successMessage = page.locator('text=/Congratulations.*Your registration is successful/');
  await expect(successMessage).toBeVisible();
  
  // Verify the "Go To Flights Search" button is displayed
  const goToFlightsButton = page.getByRole('link', { name: 'Go To Flights Search' });
  await expect(goToFlightsButton).toBeVisible();

  page.close()
  
});
