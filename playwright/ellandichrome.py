from playwright.sync_api import Playwright, sync_playwright


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Go to https://ellandi-web-develop.london.cloudapps.digital/
    page.goto("https://ellandi-web-develop.london.cloudapps.digital/")

    # Click a:has-text("Enter")
    # with page.expect_navigation(url="https://ellandi-web-develop.london.cloudapps.digital/skills/general"):
    with page.expect_navigation():
        page.locator('a:has-text("Enter")').click()
    # expect(page).to_have_url("https://ellandi-web-develop.london.cloudapps.digital/skills")

    # Click text=Your details
    page.locator("text=Your details").click()
    # expect(page).to_have_url("https://ellandi-web-develop.london.cloudapps.digital/details")

    # Click svg:has-text("open") >> nth=0
    page.locator('svg:has-text("open")').first.click()

    # Click text=Careers Wales
    page.locator("text=Careers Wales").click()

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
