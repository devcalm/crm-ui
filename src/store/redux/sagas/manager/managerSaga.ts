import { call, put, debounce } from 'redux-saga/effects';
import { Manager as ManagerNameFilter } from "@redux/reducers/manager/managerNameFilterSlice";
import { searchByName } from "./managerApi";
import { fetchManagersByNameStart, fetchManagersByNameSuccess, fetchManagersByNameError } from '@redux/reducers/manager/managerNameFilterSlice';
import { HttpError } from '@errors/HttpError';
import { PayloadAction } from '@reduxjs/toolkit';

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

export function* managerSaga() {
    yield debounce(300, fetchManagersByNameStart.type, filterManagersByName);
}