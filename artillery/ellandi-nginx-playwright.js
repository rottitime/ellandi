
module.exports = { createAccount };
const { test, expect } = require('@playwright/test');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// console.log(makeid(5));

// test('test', async ({ page }) => {
async function createAccount(page) {

  await page.goto('http://nginx/register/');

  // await page.getByRole('link', { name: 'Create account' }).click();
  await expect(page).toHaveURL('http://nginx/register/');
  // // await page.locator('a:has-text("Cabinet Office Skills and Learning")').click();
  // // await page.locator('text=Create an account')
  // await page.locator('text=you need to create an account').waitFor();


  await page.getByTestId('textfield_email').click();

  var _extra_id = makeid(6).toLowerCase()
  console.log(_extra_id)
  console.log(`peter.rabbit${_extra_id}@example.com`)

  await page.getByTestId('textfield_email').fill(`peter.rabbit${_extra_id}@example.com`);

  await page.getByTestId('textfield_email').press('Tab');

  await page.getByTestId('textfield_emailConfirm').fill(`peter.rabbit${_extra_id}@example.com`);

  await page.getByTestId('textfield_emailConfirm').press('Tab');

  await page.getByTestId('textfield_password').fill(`${_extra_id}`);

  await page.getByTestId('textfield_password').press('Tab');

  await page.getByTestId('textfield_passwordConfirm').fill(`${_extra_id}`);

  await page.getByLabel('I agree to the privacy policy').check();

}

