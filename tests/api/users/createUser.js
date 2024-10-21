import { expect } from 'chai';
import requestHelper from '../helpers/requestHelpers.js';
import { validUser } from '../../../data/userData.js';

// Define reusable function to validate the response
function validateResponse(res, expectedStatus, expectedName, expectedJob, shouldHaveId, shouldHaveName, shouldHaveJob) {
  // Validate status code
  expect(res.status).to.equal(expectedStatus);

  // Validate presence of name, job, and id based on the test data
  if (shouldHaveName) {
    expect(res.data).to.have.property('name');
    expect(res.data.name).to.equal(expectedName);
  } else {
    expect(res.data).to.not.have.property('name');
  }

  if (shouldHaveJob) {
    expect(res.data).to.have.property('job');
    expect(res.data.job).to.equal(expectedJob);
  } else {
    expect(res.data).to.not.have.property('job');
  }

  if (shouldHaveId) {
    expect(res.data).to.have.property('id');
  } else {
    expect(res.data).to.not.have.property('id');
  }
}

// Define test cases in a modular, data-driven way
const testData = [
  {
    description: 'Create user with valid data',
    userData: validUser,
    expectedStatus: 201,
    expectedName: validUser.name,
    expectedJob: validUser.job,
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with missing name',
    userData: { job: validUser.job }, // Missing name
    expectedStatus: 201,
    expectedName: null,
    expectedJob: validUser.job,
    shouldHaveId: true,
    shouldHaveName: false,
    shouldHaveJob: true
  },
  {
    description: 'Create user with missing job',
    userData: { name: validUser.name }, // Missing job
    expectedStatus: 201,
    expectedName: validUser.name,
    expectedJob: null,
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: false
  },
  {
    description: 'Create user with empty name',
    userData: { name: '', job: validUser.job }, // Empty name
    expectedStatus: 201,
    expectedName: '',
    expectedJob: validUser.job,
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with empty job',
    userData: { name: validUser.name, job: '' }, // Empty job
    expectedStatus: 201,
    expectedName: validUser.name,
    expectedJob: '',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with very long name',
    userData: { name: 'A'.repeat(256), job: validUser.job }, // Very long name (256 characters)
    expectedStatus: 201,
    expectedName: 'A'.repeat(256),
    expectedJob: validUser.job,
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with very long job title',
    userData: { name: validUser.name, job: 'A'.repeat(256) }, // Very long job title (256 characters)
    expectedStatus: 201,
    expectedName: validUser.name,
    expectedJob: 'A'.repeat(256),
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with empty body',
    userData: {}, // Proper empty object instead of a string
    expectedStatus: 201,
    expectedName: null,
    expectedJob: null,
    shouldHaveId: true,
    shouldHaveName: false,
    shouldHaveJob: false
  },
  {
    description: 'Create user with valid but new data (randomized name and job)',
    userData: { name: 'RandomUser', job: 'RandomJob' }, // RandomUser and RandomJob
    expectedStatus: 201,
    expectedName: 'RandomUser',
    expectedJob: 'RandomJob',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with name and job containing special characters',
    userData: { name: 'John@Doe!', job: 'Engineer#1' },  // Name and Job and containing characters
    expectedStatus: 201,
    expectedName: 'John@Doe!',
    expectedJob: 'Engineer#1',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with name that exceeds character limit',
    userData: { name: 'A'.repeat(300), job: 'Engineer' }, // Name exceeds character limit
    expectedStatus: 201,
    expectedName: 'A'.repeat(300),
    expectedJob: 'Engineer',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with job that exceeds character limit',
    userData: { name: 'John Doe', job: 'A'.repeat(300) }, // Job exceeds character limit
    expectedStatus: 201, 
    expectedName: 'John Doe',
    expectedJob: 'A'.repeat(300),
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with invalid JSON structure',
    userData: '{name: "John Doe", job: "Engineer"', 
    expectedStatus: 400, // Status for invalid JSON
    expectedName: null,
    expectedJob: null,
    shouldHaveId: false,
    shouldHaveName: false,
    shouldHaveJob: false
  },
  {
    description: 'Create user with non-UTF-8 encoded name',
    userData: { name: '\uFFFDJohn Doe', job: 'Engineer' }, // Name with non-UTF-8 encoded name
    expectedStatus: 201,
    expectedName: '\uFFFDJohn Doe',
    expectedJob: 'Engineer',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with very large body (overload)',
    userData: Array(1000).fill({}).join(''), // Simulating a very large body
    expectedStatus: 400, // Expected 400 for body overload
    expectedName: null,
    expectedJob: null,
    shouldHaveId: false,
    shouldHaveName: false,
    shouldHaveJob: false
  },
  {
    description: 'Create user with null value for name',
    userData: { name: null, job: 'Engineer' }, // Null value for name
    expectedStatus: 201, 
    expectedName: null,
    expectedJob: 'Engineer',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with null value for job',
    userData: { name: validUser.name, job: null }, // Null value for job
    expectedStatus: 201, 
    expectedName: validUser.name,
    expectedJob: null,
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with very short name (1-character)',
    userData: { name: 'A', job: 'Engineer' }, // Very short name
    expectedStatus: 201,
    expectedName: 'A',
    expectedJob: 'Engineer',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  },
  {
    description: 'Create user with very short job (1-character)',
    userData: { name: 'John Doe', job: 'A' }, // Very short job
    expectedStatus: 201,
    expectedName: 'John Doe',
    expectedJob: 'A',
    shouldHaveId: true,
    shouldHaveName: true,
    shouldHaveJob: true
  }
];

// Iterate through testData array and run tests
testData.forEach(({ description, userData, expectedStatus, expectedName, expectedJob, shouldHaveId, shouldHaveName, shouldHaveJob }) => {
  it(description, async function () {
    try {
      const res = await requestHelper.createUser(userData);
      validateResponse(res, expectedStatus, expectedName, expectedJob, shouldHaveId, shouldHaveName, shouldHaveJob);
    } catch (err) {
      // Add fail assertion or handle the error
      expect.fail(`Request failed with error: ${err.message}`);
    }
  });
});
