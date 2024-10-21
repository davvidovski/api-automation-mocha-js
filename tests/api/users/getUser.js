import { expect } from 'chai';
import requestHelper from '../../helpers/requestHelpers.js';
import { existingUser, existingUser2 } from '../../../data/userData.js';  // Import the existing user details

// Define reusable functions to validate user and support responses
function validateUserResponse(user, expectedUser) {
    expect(user.id).to.equal(expectedUser.id);
    expect(user.email).to.equal(expectedUser.email);
    expect(user.first_name).to.equal(expectedUser.first_name);
    expect(user.last_name).to.equal(expectedUser.last_name);
    expect(user.avatar).to.equal(expectedUser.avatar);
}

function validateSupportResponse(support) {
    expect(support.url).to.equal('https://reqres.in/#support-heading');
    expect(support.text).to.equal('To keep ReqRes free, contributions towards server costs are appreciated!');
}

// Define reusable function to validate the API response structure
function validateResponse(res, expectedStatus, expectedUser, shouldHaveData) {
    expect(res.status).to.equal(expectedStatus);

    if (shouldHaveData) {
        if (expectedUser) {
            expect(res.data.data).to.deep.equal(expectedUser); // Validate user data inside `data` object
        }
    } else {
        expect(res.data).to.be.an('object').that.is.empty; // Expecting an empty object
    }
}

// Define test cases in a modular, data-driven way
const userTestData = [
    {
        description: 'Fetch existing user by ID',
        id: 2,
        expectedUser: existingUser,  // Ensure this object has the expected structure
        expectedStatus: 200,
        shouldHaveData: true,
    },
    {
        description: 'Fetch non-existing user by ID',
        id: 99999999,
        expectedStatus: 404,
        shouldHaveData: false,
    },
    {
        description: 'Fetch user with invalid ID format',
        id: 'invalid-id',
        expectedStatus: 404,
        shouldHaveData: false,
    },
    {
        description: 'Fetch all users when no ID is provided',
        id: '',
        expectedStatus: 200,
        expectedUser: undefined, // No specific user expected in this case
        shouldHaveData: true,
    },
    {
        description: 'Fetch existing user by another valid ID',
        id: 3,
        expectedUser: existingUser2, // Another user object for validation
        expectedStatus: 200,
        shouldHaveData: true,
    }
];

describe('Get User API Test', () => {
    userTestData.forEach(({ description, id, expectedUser, expectedStatus, shouldHaveData }) => {
        it(description, async () => {
            const endpoint = id ? `/users/${id}` : '/users';  // Construct endpoint based on ID presence
            const response = await requestHelper.getUser(endpoint);

            validateResponse(response, expectedStatus, expectedUser, shouldHaveData);

            // If the user data is expected, validate the user response
            if (shouldHaveData && expectedUser) {
                const user = response.data.data;  // Access the user data if it exists
                validateUserResponse(user, expectedUser);
            }

            // Validate the support section if expected
            if (shouldHaveData) {
                const support = response.data.support;
                validateSupportResponse(support);
            }
        });
    });
});
