import { expect } from 'chai';
import requestHelper from '../helpers/requestHelpers.js';
import { validUser } from '../../../data/userData.js';

describe('Delete User API Test', function() {
  let userId;

  before(async function() {
    // First, create the user
    const res = await requestHelper.post('/users', validUser);

    userId = res.data.id; // Get the ID of the created user
  });

  it('should delete a user by ID', async function() {
    const res = await requestHelper.delete(`/users/${userId}`);

    expect(res.status).to.equal(204); // Expect a 204 status (No Content)
    expect(res.data).to.be.empty; // Expect no response body
  });

});
