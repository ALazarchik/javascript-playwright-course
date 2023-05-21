import { v4 as uuidv4 } from "uuid";
const Chance = require('chance');
const chance = new Chance();

export const usersDetails = {
    email: `${uuidv4()}@testmail.com`,
    password: uuidv4().replaceAll('-',''),
    firstName: chance.first({ nationality: 'it' }),
    lastName: chance.last({ nationality: 'it' }),
    address: {
        street: chance.street({ country: 'it' }),
        postCode: chance.zip(),
        city: chance.city(),
        country: 'Italy'
    },
    creditCard: {
        number: '1234567891012345',
        validUntil: '12/30',
        cvc: '111'
    }
};
