## Getting Started

The project can be run locally. Clone the repo and create a `.env` file in the `playwright-typescript` folder. Inside the file, provide the email and password for a test user using the following structure:
```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
Make sure test user has confirmed their phone number.

Open a terminal, run `npm install`, and after that, you can launch tests using the `npx playwright test` command. Test suite runs against staging. 