import { call, put, debounce, takeLatest } from 'redux-saga/effects';
import { Manager as ManagerNameFilter } from "@redux/reducers/manager/managerNameFilterSlice";
import { getManagerNameByGuid, searchByName } from "./managerApi";
import { fetchManagersByNameStart, fetchManagersByNameSuccess, fetchManagersByNameError } from '@redux/reducers/manager/managerNameFilterSlice';
import { fetchManagerNameByGuidStart, fetchManagerNameByGuidSuccess, fetchManagerNameByGuidError } from '@redux/reducers/manager/managerNameFetcherSlice';
import { HttpError } from '@errors/HttpError';
import { PayloadAction } from '@reduxjs/toolkit';
import handleHttpError from '@errors/handleHttpError';

function* filterManagersByName(action: PayloadAction<string>) {
    try {
        const response: ManagerNameFilter[] = yield call(searchByName, action.payload);
        yield put(fetchManagersByNameSuccess(response));
    } catch (error: unknown) {
        const errorMessage = HttpError.isInstance(error)
            ? error.errorDetail
            : 'Unknown error';
        yield put(fetchManagersByNameError(errorMessage));
    }
}

export function* fetchManagerNameByGuid(action: PayloadAction<string>) {
    try {
        const response: string = yield call(getManagerNameByGuid, action.payload);
        yield put(fetchManagerNameByGuidSuccess(response));
    } catch (error: unknown) {
        const httpError = handleHttpError(error);
        yield put(fetchManagerNameByGuidError(httpError));
    }
}

export function* managerSaga() {
    yield debounce(300, fetchManagersByNameStart.type, filterManagersByName);
    yield takeLatest(fetchManagerNameByGuidStart.type, fetchManagerNameByGuid);
}