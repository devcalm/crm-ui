import { call, put, debounce, takeLatest } from 'redux-saga/effects';
import { Product as ProductNameFilter } from "@redux/reducers/product/productNameFilterSlice";
import { getProductNameByGuid, searchByName } from "./productApi";
import { fetchProductsByNameStart, fetchProductsByNameSuccess, fetchProductsByNameError } from '@redux/reducers/product/productNameFilterSlice';
import { HttpError } from '@errors/HttpError';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchProductNameByGuidStart, fetchProductNameByGuidSuccess, fetchProductNameByGuidError } from '@redux/reducers/product/productNameFetcherSlice';
import handleHttpError from '@errors/handleHttpError';

function* filterProductsByName(action: PayloadAction<string>) {
    try {
        const response: ProductNameFilter[] = yield call(searchByName, action.payload);
        yield put(fetchProductsByNameSuccess(response));
    } catch (error: unknown) {
        const errorMessage = HttpError.isInstance(error)
            ? error.errorDetail
            : 'Unknown error';
        yield put(fetchProductsByNameError(errorMessage));
    }
}

export function* fetchProductNameByGuid(action: PayloadAction<string>) {
    try {
        const response: string = yield call(getProductNameByGuid, action.payload);
        yield put(fetchProductNameByGuidSuccess(response));
    } catch (error: unknown) {
        const httpError = handleHttpError(error);
        yield put(fetchProductNameByGuidError(httpError));
    }
}

export function* productSaga() {
    yield debounce(300, fetchProductsByNameStart.type, filterProductsByName);
    yield takeLatest(fetchProductNameByGuidStart.type, fetchProductNameByGuid);
}