<div align="center">

English | [繁體中文](README_zh.md)

</div>

## Getting Started

The project can be run locally. Clone the repo and create a `.env` file in the `playwright-typescript` folder. Inside the file, provide the email and password for a test user using the following structure:
```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
Make sure test user has confirmed their phone number.

Open a terminal, run `npm install`, and after that, you can launch tests using the `npx playwright test` command. Test suite runs against staging. 

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