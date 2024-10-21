# API Automation with Mocha and Chai

This project is an API automation framework built with JavaScript, using Mocha as the test framework and Chai for assertions. It provides a set of tests for various user-related API endpoints.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

---

## Requirements

Before you start, ensure that you have the following installed:

- Node.js (version 16 or above)
- npm (Node Package Manager)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/davvidovski/api-automation-mocha-js
cd api-automation-mocha-js
npm install // to install the dependencies
```
---

## Project Structure

The project has the following structure:

```bash
api-automation-mocha-js/
├── .github/
│   └── workflows/
│       ├──  manual-run.yaml
│       ├──  on-push-pr.yaml
│       └──  on-schedule.yaml
├── config/
│   └── apiConfig.js
├── data/
│   └── userData.js
├── node_modules/
├── tests/
│   ├── api/
│   │   └── users/
│   │       ├── createUser.js
│   │       ├── getUser.js
│   │       ├── updateUser.js
│   │       └── deleteUser.js
│   helpers/
│   └── requestHelpers.js
├── .mocharc.json
├── package.json
└── README.md
```
---

## Scripts

The following scripts are available in this project:

- test: Runs all tests in the tests directory.
- test:createUser: Runs tests for creating a user.
- test:getUser: Runs tests for retrieving a user.
- test:updateUser: Runs tests for updating a user.
- test:deleteUser: Runs tests for deleting a user.

---

## Dependencies

This project uses the following dependencies:

- axios: A promise-based HTTP client for making API requests.
- chai: An assertion library for Node.js.
- mocha: A test framework for running tests.

You can view the full list of dependencies in the package.json file.

---

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

To run tests for a specific API endpoint, you can use one of the following commands:

```bash
npm run test:createUser
npm run test:getUser
npm run test:updateUser
npm run test:deleteUser
```

---


