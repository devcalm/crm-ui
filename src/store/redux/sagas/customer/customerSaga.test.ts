import { call, debounce } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { filterCustomersByName, customerSaga } from './customerSaga';
import {
    fetchCustomersByNameStart,
    fetchCustomersByNameSuccess,
    fetchCustomersByNameError,
} from '@redux/reducers/customer/customerNameFilterSlice';
import { searchByName } from './customerApi';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HttpError } from '@errors/HttpError';

const mock = new MockAdapter(axios);

describe('Customer Saga', () => {
    afterEach(() => {
        mock.reset();
    });

    const mockResponse = [
        { guid: 'b73c41bb-391f-4ed3-b183-e46e124f39b4', name: 'John Doe' },
        { guid: 'b392d571-c6f5-4840-8812-7ae98f1427d3', name: 'Jane Doe' },
    ];

    it('handles success case for filterCustomersByName saga', () => {
        const action = { type: fetchCustomersByNameStart.type, payload: 'Doe' };

        mock.onGet('/api/customer/search').reply(200, mockResponse);

        return expectSaga(filterCustomersByName, action)
            .provide([[call(searchByName, 'Doe'), mockResponse]])
            .put(fetchCustomersByNameSuccess(mockResponse))
            .run();
    });

    it('handles error case for filterCustomersByName saga', () => {
        const action = { type: fetchCustomersByNameStart.type, payload: 'Doe' };
        const error = new HttpError(500, 'Internal Server Error');

        return expectSaga(filterCustomersByName, action)
            .provide([[call(searchByName, 'Doe'), Promise.reject(error)]])
            .put(fetchCustomersByNameError(error.errorDetail))
            .run();
    });

    it('handles unknown error in filterCustomersByName saga', () => {
        const action = { type: fetchCustomersByNameStart.type, payload: 'Doe' };
        const error = new Error('Unexpected Error');

        return expectSaga(filterCustomersByName, action)
            .provide([[call(searchByName, 'Doe'), Promise.reject(error)]])
            .put(fetchCustomersByNameError('Unknown error'))
            .run();
    });


    it('validates the debounce effect in customerSaga', () => {
        const generator = customerSaga();
        const firstYield = generator.next().value;

        expect(firstYield).toEqual(
            debounce(300, fetchCustomersByNameStart.type, filterCustomersByName)
        );

        // Ensure the generator completes
        const done = generator.next().done;
        expect(done).toBe(true);
    });
});
