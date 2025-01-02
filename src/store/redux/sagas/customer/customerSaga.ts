import { call, put, debounce, takeLatest } from 'redux-saga/effects';
import { Customer as CustomerNameFilter } from "@redux/reducers/customer/customerNameFilterSlice";
import { fetchNameByGuid, searchByName } from "./customerApi";
import { fetchCustomersByNameStart, fetchCustomersByNameSuccess, fetchCustomersByNameError } from '@redux/reducers/customer/customerNameFilterSlice';
import { fetchCustomerByNameStart, fetchCustomerByNameSuccess, fetchCustomerByNameError } from '@redux/reducers/customer/customerNameFetcherSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import handleHttpError from '@errors/handleHttpError';

export function* filterCustomersByName(action: PayloadAction<string>) {
    try {
        const response: CustomerNameFilter[] = yield call(searchByName, action.payload);
        yield put(fetchCustomersByNameSuccess(response));
    } catch (error: unknown) {
        const httpError = handleHttpError(error);
        yield put(fetchCustomersByNameError(httpError.detail));
    }
}

export function* fetchCustomerByName(action: PayloadAction<string>) {
    try {
        const response: string = yield call(fetchNameByGuid, action.payload);
        yield put(fetchCustomerByNameSuccess(response));
    } catch (error: unknown) {
        const httpError = handleHttpError(error);
        yield fetchCustomerByNameError(httpError);
    }
}

export function* customerSaga() {
    yield debounce(300, fetchCustomersByNameStart.type, filterCustomersByName);
    yield takeLatest(fetchCustomerByNameStart.type, fetchCustomerByName);
}