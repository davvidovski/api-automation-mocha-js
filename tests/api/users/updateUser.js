import { expect } from 'chai';
import requestHelper from '../helpers/requestHelpers.js';
import { updateUser } from '../../../data/userData.js';

describe('Update User API Test', function() {
  it('should update user details', async function() {
    const res = await requestHelper.put('/api/users/2', updateUser);

    // Log the full response to inspect the structure
    console.log(res);

    // Check the status code is 200
    expect(res.status).to.equal(200);

    expect(res.data.name).to.equal(updateUser.name);
    expect(res.data.job).to.equal(updateUser.job);
  });
});
