import { expect } from 'chai';
import requestHelper from '../helpers/requestHelpers.js';

describe('Delete User API Test', function() {
  let userId;

  before(async function() {
    // First, create the user
    const postResponse = await requestHelper.post('/users', {
      name: 'John Doe',
      job: 'Engineer',
    });

    userId = postResponse.data.id; // Get the ID of the created user
    console.log(`User created with ID: ${userId}`);
  });

  it('should delete a user by ID', async function() {
    const res = await requestHelper.delete(`/users/${userId}`);

    expect(res.status).to.equal(204); // Expect a 204 status (No Content)
    expect(res.data).to.be.empty; // Expect no response body
  });

});
