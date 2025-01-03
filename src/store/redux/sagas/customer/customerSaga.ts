import { call, put, debounce, takeLatest } from 'redux-saga/effects';
import { Customer as CustomerNameFilter } from "@redux/reducers/customer/customerNameFilterSlice";
import { getCustomerNameByGuid, searchByName } from "./customerApi";
import { fetchCustomersByNameStart, fetchCustomersByNameSuccess, fetchCustomersByNameError } from '@redux/reducers/customer/customerNameFilterSlice';
import { fetchCustomerNameByGuidStart, fetchCustomerNameByGuidSuccess, fetchCustomerNameByGuidError } from '@redux/reducers/customer/customerNameFetcherSlice';
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

export function* fetchCustomerNameByGuid(action: PayloadAction<string>) {
    try {
        const response: string = yield call(getCustomerNameByGuid, action.payload);
        yield put(fetchCustomerNameByGuidSuccess(response));
    } catch (error: unknown) {
        const httpError = handleHttpError(error);
        yield put(fetchCustomerNameByGuidError(httpError));
    }
}

export function* customerSaga() {
    yield debounce(300, fetchCustomersByNameStart.type, filterCustomersByName);
    yield takeLatest(fetchCustomerNameByGuidStart.type, fetchCustomerNameByGuid);
}