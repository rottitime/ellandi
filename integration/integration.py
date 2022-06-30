from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Go to http://localhost:3000/
    page.goto("http://web:3000/")
    print(page.title())  # noqa
    # Click text=http://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk
    page.locator("text=http://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk").click()
    # expect(page).to_have_url("http://localhost:3000/register/page2")

    # Click text=Start nowButtonArrow
    page.locator("text=Start nowButtonArrow").click()
    # expect(page).to_have_url("http://localhost:3000/register/page3")

    # Click input[name="group0"] >> nth=0
    page.locator("input[name=\"group0\"]").first.click()

    # Fill input[name="group0"] >> nth=0
    page.locator("input[name=\"group0\"]").first.fill("joe.bloggs@cabinetoffice.gov.uk")

    # Click input[name="group0"] >> nth=1
    page.locator("input[name=\"group0\"]").nth(1).click()

    # Click input[name="group0"] >> nth=1
    page.locator("input[name=\"group0\"]").nth(1).click()

    # Fill input[name="group0"] >> nth=1
    page.locator("input[name=\"group0\"]").nth(1).fill("joe.bloggs@cabinetoffice.gov.uk")

    # Click text=Password >> nth=2
    page.locator("text=Password").nth(2).click()

    # Click input[name="group0"] >> nth=2
    page.locator("input[name=\"group0\"]").nth(2).click()

    # Fill input[name="group0"] >> nth=2
    page.locator("input[name=\"group0\"]").nth(2).fill("password")

    # Click input[name="group0"] >> nth=3
    page.locator("input[name=\"group0\"]").nth(3).click()

    # Fill input[name="group0"] >> nth=3
    page.locator("input[name=\"group0\"]").nth(3).fill("password")

    # Click text=Continue
    page.locator("text=Continue").click()
    # expect(page).to_have_url("http://localhost:3000/register/page4")

    # Check input[type="checkbox"]
    page.locator("input[type=\"checkbox\"]").check()

    # Click text=Continue
    page.locator("text=Continue").click()
    # expect(page).to_have_url("http://localhost:3000/register/page5")

    # Click input[name="group0"] >> nth=0
    page.locator("input[name=\"group0\"]").first.click()

    # Fill input[name="group0"] >> nth=0
    page.locator("input[name=\"group0\"]").first.fill("Joe Bloggs")

    # Press Tab
    page.locator("input[name=\"group0\"]").first.press("Tab")

    # Fill input[name="group0"] >> nth=1
    page.locator("input[name=\"group0\"]").nth(1).fill("i.ai")

    # Press Tab
    page.locator("input[name=\"group0\"]").nth(1).press("Tab")

    # Fill input[name="group0"] >> nth=2
    page.locator("input[name=\"group0\"]").nth(2).fill("developer")

    # Press Tab
    page.locator("input[name=\"group0\"]").nth(2).press("Tab")

    # Fill input[name="group0"] >> nth=3
    page.locator("input[name=\"group0\"]").nth(3).fill("Larry@co.gov")

    # Press Tab
    page.locator("input[name=\"group0\"]").nth(3).press("Tab")

    # Fill input[name="group0"] >> nth=4
    page.locator("input[name=\"group0\"]").nth(4).fill("UK")

    # Click text=Continue
    page.locator("text=Continue").click()
    # expect(page).to_have_url("http://localhost:3000/register/page6")
    print(page.title())  # noqa
    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
