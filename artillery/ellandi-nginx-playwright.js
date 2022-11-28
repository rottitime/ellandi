
module.exports = { createAccount };
const { expect } = require('@playwright/test');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var url = 'http://nginx'

async function createAccount(page) {

  await page.goto(`${url}/register/`)

  await expect(page).toHaveURL(`${url}/register/`);

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

