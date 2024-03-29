<p align="center">
  <a href="https://myfunnow.com/">
    <img width="200" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/b24a85c8-cebc-4203-8ddd-22536079c725">
  </a>
	
</p>
<div align="center">

[![Playwright Tests (TypeScript)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-typescript.yml/badge.svg)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-typescript.yml) [![Playwright Tests (Python)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-python.yml/badge.svg)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-python.yml)

English | [繁體中文](README_zh.md)

</div>

# FunNow Playwright Automation Proof-of-Concept


## Description

This proof-of-concept uses Playwright to test the happy path of the booking flow ([TypeScript](playwright-typescript/tests/booking.spec.ts), [Python](playwright-python/tests/test_booking.py)) for every available locale on the [FunNow](https://myfunnow.com/) website. It automatically runs on GitHub Actions [for each commit](https://github.com/koynoyno/funnow-ci-automation/actions) and Pull Request (CI/CD) and automatically uploads testing results to a TestRail instance using `trcli`.

## Technologies Used

- Playwright (TypeScript + Python) + [POM design pattern](https://playwright.dev/docs/pom "POM design pattern") + [parameterized tests](https://playwright.dev/docs/test-parameterize "parameterized tests") + [fixtures](https://playwright.dev/docs/test-fixtures)
- GitHub Actions + [caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows) + [secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [trcli](https://github.com/gurock/trcli "trcli") (to automatically upload screenshots of failed tests to a TestRail instance)

## Getting Started

- [TypeScript](playwright-typescript/README.md)
- [Python](playwright-python/README.md)

## ⚠️ Important to note

To make the system-under-test (SUT) more testable, it is **[HIGHLY SUGGESTED](https://playwright.dev/docs/locators#locate-by-test-id)** to implement `data-testid` attributes. Because the SUT doesn't use `data-testid`, locators are brittle and unreadable. This makes the automation process unnecessarily complex.


## Issues & Tradeoffs

#### Why Page Objects use assertions?

Although it's [not recommended](https://martinfowler.com/bliki/PageObject.html) to use assertions inside Page Objects, the behavior of the system-under-test (SUT) can sometimes be unpredictable. Therefore, this proof-of-concept uses assertions inside Page Objects for the sake of simplicity.

#### Why are booking flow tests flaky?

There's an issue where if a user makes too many bookings using the same time, they will be suddenly redirected to the time selection page instead of the payment page (see screenshot below). In such cases, the website doesn't handle the error that's coming from the API.

![image](https://github.com/koynoyno/funnow-ci-automation/assets/46102189/d4918b91-df3e-409a-bd56-a199c4a55adf)

API error as follows:

```
{
	"code": 42,
	"message": "This Product Has Been Sold Out."
}
```

This issue might be resolved with proper teardown, where bookings made are removed from the database. However, I didn't have access to the database while implementing this proof-of-concept.

## What is the [bugs.spec.ts (TS)](playwright-typescript/tests/bugs.spec.ts) / [test_bugs.py (Python)](playwright-python/tests/test_bugs.py) file?

Several issues were found during testing. 

Some of them are easily verifiable, so they were implemented in the `bugs.spec.ts` / `test_bugs.py` files. These tests are [expected to fail](https://playwright.dev/docs/api/class-test#test-fail-1) unless the related bugs are fixed.


## trcli explanation

After each CI run, test results are automatically uploaded to TestRail. You can find the related workflow step [here](.github/workflows/playwright.yml#L41-L53).

Example of a successful test run:

<img width="1531" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/532f9b3d-7523-4cc1-bf06-25e38078bb22"><br/><br/>

Example of an unsuccessful test run, with error descriptions and screenshots attached to the test run results:

<img width="1527" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/516fd9df-f186-4715-a878-864af2a8c940"><br/><br/>

Example of test cases that are automatically created by `trcli`. Note that test cases can be sorted using the _Automation type_ field:

<img width="1526" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/ba3cedb7-d5b2-4aff-aaab-d472cf4244ea"><br/><br/>
