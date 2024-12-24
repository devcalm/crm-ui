import { call, put, debounce } from 'redux-saga/effects';
import { ApiResponse as ProductNameFilterResponse } from "@redux/reducers/product/productNameFilterSlice";
import { searchByName } from "./productApiCall";
import {
    fetchProductsByNameStart,
    fetchProductsByNameSuccess,
    fetchProductsByNameError
} from '@redux/reducers/product/productNameFilterSlice';

interface FilterProductsByNameAction {
    type: string,
    payload: string
}

function* filterProductsByName(action: FilterProductsByNameAction) {
    try {
        const response: ProductNameFilterResponse = yield call(searchByName, action.payload);
        yield put(fetchProductsByNameSuccess(response.data));
    } catch (error: any) {
        yield put(fetchProductsByNameError(error.message || 'Something went wrong'));
    }
}

export function* productSaga() {
    yield debounce(300, fetchProductsByNameStart.type, filterProductsByName);
}