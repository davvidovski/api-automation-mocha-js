import { expect } from 'chai';
import requestHelper from '../../helpers/requestHelpers.js';
import { updateUser } from '../../../data/userData.js';

// Define reusable function to validate the response
function validateResponse(res, expectedStatus) {
  // Validate status code
  expect(res.status).to.equal(expectedStatus);

  // Validate that the response contains the updatedAt field
  if (expectedStatus === 200) {
    expect(res.data).to.have.property('updatedAt');
  }
}

// Define test cases in a modular, data-driven way
const testData = [
  {
    description: 'Update user with valid data',
    userData: updateUser,
    expectedStatus: 200,
  },
  {
    description: 'Update user with missing name',
    userData: { job: updateUser.job }, // Missing name
    expectedStatus: 200,
  },
  {
    description: 'Update user with missing job',
    userData: { name: updateUser.name }, // Missing job
    expectedStatus: 200,
  },
  {
    description: 'Update user with empty name',
    userData: { name: '', job: updateUser.job }, // Empty name
    expectedStatus: 200,
  },
  {
    description: 'Update user with empty job',
    userData: { name: updateUser.name, job: '' }, // Empty job
    expectedStatus: 200,
  },
  {
    description: 'Update user with empty body',
    userData: {}, // Empty body
    expectedStatus: 200,
  },
  {
    description: 'Update user with very long name',
    userData: { name: 'A'.repeat(256), job: updateUser.job }, // Very long name (256 characters)
    expectedStatus: 200,
  },
  {
    description: 'Update user with very long job title',
    userData: { name: updateUser.name, job: 'A'.repeat(256) }, // Very long job title (256 characters)
    expectedStatus: 200,
  },
  {
    description: 'Update user with null value for name',
    userData: { name: null, job: updateUser.job }, // Null value for name
    expectedStatus: 200,
  },
  {
    description: 'Update user with null value for job',
    userData: { name: updateUser.name, job: null }, // Null value for job
    expectedStatus: 200,
  },
];

// Iterate through testData array and run tests
testData.forEach(({ description, userData, expectedStatus }) => {
  it(description, async function () {
    try {
      const res = await requestHelper.updateUser('/api/users/2', userData); // Update with a valid user ID
      validateResponse(res, expectedStatus);
    } catch (err) {
      // Add fail assertion or handle the error
      expect.fail(`Request failed with error: ${err.message}`);
    }
  });
});
