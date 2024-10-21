import { expect } from 'chai';
import requestHelper from '../helpers/requestHelpers.js';
import { validUser } from '../../../data/userData.js';

describe('Create User API Test', function() {
  it('should create a new user successfully', async function() {
    const res = await requestHelper.post('/users', validUser);

    expect(res.status).to.equal(201); // Check status
    expect(res.data.name).to.equal(validUser.name); // Check name in response
    expect(res.data.job).to.equal(validUser.job); // Check job in response
    expect(res.data).to.have.property('id'); // Check if ID is returned
  });
});
