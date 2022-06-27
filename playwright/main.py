# main.py
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://ellandi-web-develop.london.cloudapps.digital/")
    page.screenshot(path="example.png")
    browser.close()
