import { expect } from 'chai';
import requestHelper from '../../api/helpers/requestHelpers.js';  // Import the helper
import { existingUser } from '../../../data/userData.js';  // Import the existing user details

describe('Get User API Test', () => {
    it('should fetch the created user by ID and validate all details', async () => {
        try {
            const response = await requestHelper.get('/users/2');  // Use the helper to make the GET request

            const user = response.data.data;  // Access the user data

            // Validate all user details with existingUser data
            expect(user.id).to.equal(existingUser.id);
            expect(user.email).to.equal(existingUser.email);
            expect(user.first_name).to.equal(existingUser.first_name);
            expect(user.last_name).to.equal(existingUser.last_name);
            expect(user.avatar).to.equal(existingUser.avatar);

            // Validate the support section
            const support = response.data.support;
            expect(support.url).to.equal('https://reqres.in/#support-heading');
            expect(support.text).to.equal('To keep ReqRes free, contributions towards server costs are appreciated!');
        } catch (error) {
            console.error('Error in fetching user:', error);  // Log error
            throw error;  // Fail the test if there is an error
        }
    });
});
