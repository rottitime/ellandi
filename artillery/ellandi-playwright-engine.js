
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

var url = 'https://ellandi-staging.london.cloudapps.digital'

async function createAccount(page) {

  await page.goto(`${url}/register/`)

  await expect(page).toHaveURL(`${url}/register/`);

  await page.getByTestId('textfield_email').click();

  var _extra_id = makeid(6).toLowerCase()
  var _password = makeid(8).toLowerCase()

  console.log(`peter.rabbit${_extra_id}@example.com`)

  await page.getByTestId('textfield_email').fill(`peter.rabbit${_extra_id}@example.com`);

  await page.getByTestId('textfield_email').press('Tab');

  await page.getByTestId('textfield_emailConfirm').fill(`peter.rabbit${_extra_id}@example.com`);

  await page.getByTestId('textfield_emailConfirm').press('Tab');

  await page.getByTestId('textfield_password').fill(`A${_password}!23`);

  await page.getByTestId('textfield_password').press('Tab');

  await page.getByTestId('textfield_passwordConfirm').fill(`A${_password}!23`);

  await page.getByLabel('I agree to the privacy policy').check();

  await page.getByTestId('submit-button').click();


  await expect(page).toHaveURL(`${url}/register/step/0/`);

  await page.getByTestId('textfield_first_name').click();

  await page.getByTestId('textfield_first_name').fill('Peter');

  await page.getByTestId('textfield_first_name').press('Tab');

  await page.getByTestId('textfield_last_name').fill(`Rabbit${_extra_id}`);

  await page.getByTestId('textfield_last_name').press('Tab');

  await page.getByLabel('Job title').fill('devops');

  await page.getByRole('option', { name: 'Development operations (DevOps) engineer' }).click();

  await page.getByLabel('Business unit').click();

  await page.getByRole('option', { name: 'Assurance, Finance and Controls' }).click();

  await page.getByTestId('textfield_location').click();

  await page.getByTestId('textfield_location').fill('London');

  await page.getByTestId('textfield_line_manager_email').click();

  await page.getByTestId('textfield_line_manager_email').fill('manager@example.com');
//-------
  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/1/`);

  await page.getByText('Grade 7 Equivalent').click();

  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/2/`);

  await page.getByRole('button', { name: 'Primary profession ​' }).click();

  await page.getByRole('option', { name: 'Digital, data and technology' }).click();

  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/3/`);

  await page.getByText('Communications').click();

  await page.getByText('Security').click();

  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/4/`);

  await page.getByText('Project delivery').click();

  await page.getByText('Digital').click();

  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/5/`);

  await page.getByText('Agency').click();

  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/6/`);

  await page.locator('label:has-text("No")').first().click();

  await page.getByTestId('submit-button').click();
  await expect(page).toHaveURL(`${url}/register/step/7/`);

  await page.locator('div[role="radiogroup"]:has-text("YesNoI don\'t know") div').nth(1).click();


}
