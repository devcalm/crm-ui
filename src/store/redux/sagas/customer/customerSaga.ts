import { call, put, debounce } from 'redux-saga/effects';
import { Customer as CustomerNameFilter } from "@redux/reducers/customer/customerNameFilterSlice";
import { searchByName } from "./customerApi";
import {
    fetchCustomersByNameStart,
    fetchCustomersByNameSuccess,
    fetchCustomersByNameError
} from '@redux/reducers/customer/customerNameFilterSlice';
import { HttpError } from '@errors/HttpError';

interface FilterCustomersByNameAction {
    type: string,
    payload: string
}

function* filterCustomersByName(action: FilterCustomersByNameAction) {
    try {
        const response: CustomerNameFilter[] = yield call(searchByName, action.payload);
        yield put(fetchCustomersByNameSuccess(response));
    } catch (error: unknown) {
        const errorMessage = HttpError.isInstance(error)
            ? error.errorDetail
            : 'Unknown error';
        yield put(fetchCustomersByNameError(errorMessage));
    }
}

export function* customerSaga() {
    yield debounce(300, fetchCustomersByNameStart.type, filterCustomersByName);
}