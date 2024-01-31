<p align="center">
  <a href="https://github.com/koynoyno/funnow-ci-automation/">
    <img width="200" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/b24a85c8-cebc-4203-8ddd-22536079c725">
  </a>
	
</p>
<div align="center">
	
[![Playwright Tests](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright.yml)

</div>

# FunNow Playwright Proof-of-Concept
English | [繁體中文](README_zh.md)

## Description

This proof-of-concept uses Playwright to test happy path of booking flow for every language of the FunNow website, it automatically runs on GitHub Actions on each commit and Pull Request, and automatically uploads testing results to TestRail instance using `trcli`.

## Technologies Used

- Playwright + [POM design pattern](https://playwright.dev/docs/pom "POM design pattern") + [patameterized tests](https://playwright.dev/docs/test-parameterize "patameterized tests")
- GitHub Actions + caching
- [trcli](https://github.com/gurock/trcli "trcli") (to automatically upload screenshots of failed tests to TestRail instance)

## Getting Started

The project can be run locally. Clone the folder and create `.env` file in root folder, inside the file provide email and password for test user using following structure:
```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
Open terminal, `npm install`,  and after that you can launch tests using `npx playwright test` command.

## Project structure
```
├── data # various test data
│   ├── auth.ts
│   ├── creditCards.ts
│   └── locales.ts
├── fixtures
│   ├── autoFixtures.ts # automatic fixtures, global "beforeAll"
│   └── testrailScreenshot.fixture.ts # automatic uploading of failure screenshots
├── pages # Page Object Model
│   ├── bookingFlow
│   ├── branchPage.ts
│   └── headerPage.ts
└── tests
    ├── booking.spec.ts # booking flow (happy path)
    ├── bugs.spec.ts # existing bug in web application
    └── helpers
        └── auth.setup.ts # handles authorization logic using API/UI
```

## ⚠️ Important to note

To make the system-under-test (SUT) more testable, it's **[HIGHLY SUGGESTED](https://playwright.dev/docs/locators#locate-by-test-id)** to implement `data-testid` attributes. Because SUT doesn't use `data-testid`, locators are [brittle](pages/branchPage.ts#L25) and [unreadable](pages/branchPage.ts#L19), which makes the automation process unnecessary complex and wastes time of developers. 

## Issues & Tradeoffs

#### Why Page Objects use assertions?

Although it's [not recommended](https://martinfowler.com/bliki/PageObject.html) to use assertions inside Page Objects, SUT behavior sometimes might be unpredictable, so this proof-of-concept uses locators inside Page Objects for the sake of simplicity.

#### Why booking flow tests are flaky?

There's an issue where if user makes too many bookings using the same time, they will be suddenly redirected to time selection page instead of payment page, in such case website doesn't handle error that's coming from API.

API error as following:
```
{
	"code": 42,
	"message": "This Product Has Been Sold Out."
}
```

This issue might be resolved with proper teardown where made bookings are removed from database, however, I didn't have access to database during implementing this proof-of-concept.

## What's [bugs.spec.ts](tests/bugs.spec.ts) file?

There were several issues found during testing. 

Some of them are easily verifiable, so they were implemented in the `bugs.spec.ts` file. These tests are [expected to fail](https://playwright.dev/docs/api/class-test#test-fail-1) unless related bugs will be fixed.


## trcli explanation

After each CI run, tests results are automatically uploaded to TestRail. You can find related workflow step [here](.github/workflows/playwright.yml#L37-L49).

Example of successful test run:

<img width="1531" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/532f9b3d-7523-4cc1-bf06-25e38078bb22"><br/><br/>

Example of unsuccesful test run, error descriptions and screenshots are attached to test run results:

<img width="1527" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/516fd9df-f186-4715-a878-864af2a8c940"><br/><br/>

Example of test cases that are automatically created by `trcli`. Note that test cases can be sorted using _Automation type_ field:

<img width="1526" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/ba3cedb7-d5b2-4aff-aaab-d472cf4244ea"><br/><br/>
