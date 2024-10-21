import { expect } from 'chai';
import requestHelper from '../../helpers/requestHelpers.js';
import { validUser } from '../../../data/userData.js';

describe('Delete User API Test', function() {
  let userId;

  before(async function() {
    // First, create the user
    const res = await requestHelper.createUser(validUser);
    userId = res.data.id; // Get the ID of the created user
  });

  // Helper function to validate delete response
  function validateDeleteResponse(res, expectedStatus) {
    expect(res.status).to.equal(expectedStatus);
    expect(res.data).to.be.empty; // Expect no response body
  }

// Test cases for deletion scenarios
const deleteTestData = [
  {
    description: 'Delete user by valid ID',
    userId: userId,
    expectedStatus: 204
  }
];

  // Iterate through deleteTestData array and run tests
  deleteTestData.forEach(({ description, userId, expectedStatus }) => {
    it(description, async function () {
      try {
        const res = await requestHelper.deleteUser(`/users/${userId}`);
        validateDeleteResponse(res, expectedStatus);
      } catch (err) {
        // Handle the error appropriately
        expect.fail(`Request failed with error: ${err.message}`);
      }
    });
  });
});
