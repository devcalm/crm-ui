import { call, put, debounce } from 'redux-saga/effects';
import { Product as ProductNameFilter } from "@redux/reducers/product/productNameFilterSlice";
import { searchByName } from "./productApiCall";
import {
    fetchProductsByNameStart,
    fetchProductsByNameSuccess,
    fetchProductsByNameError
} from '@redux/reducers/product/productNameFilterSlice';
import { HttpError } from '@errors/HttpError';

interface FilterProductsByNameAction {
    type: string,
    payload: string
}

function* filterProductsByName(action: FilterProductsByNameAction) {
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

export function* productSaga() {
    yield debounce(300, fetchProductsByNameStart.type, filterProductsByName);
}