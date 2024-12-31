import { call, put, takeLatest } from 'redux-saga/effects';
import { createInquiry, viewInquiry } from "./inquiryApi";
import {
    createInquiryStart,
    createInquirySuccess,
    createInquiryError
} from '@redux/reducers/inquiry/inquiryCreateSlice';
import {
    viewInquiryStart,
    viewInquirySuccess,
    viewInquiryError
} from '@redux/reducers/inquiry/InquiryViewSlice';
import { ValidationHttpError } from '@errors/ValidationHttpError';
import { HttpError } from '@errors/HttpError';
import { CreateInquiryDto, InquiryDto } from '@models/dto/inquiryDto';
import { BackendError } from '@models/dto/BackendError';

interface createInquiryAction {
    type: string,
    payload: CreateInquiryDto
}
function* createNewInquiry(action: createInquiryAction) {
    try {
        const response: number = yield call(createInquiry, action.payload);
        yield put(createInquirySuccess(response));
    } catch (error: unknown) {
        const inquiryError = handleHttpError(error);
        yield put(createInquiryError(inquiryError));
    }
}

interface viewInquiryAction {
    type: string,
    payload: number
}
function* showInquiry(action: viewInquiryAction) {
    try {
        const response: InquiryDto = yield call(viewInquiry, action.payload);
        yield put(viewInquirySuccess(response));
    } catch (error: unknown) {
        const inquiryError = handleHttpError(error);
        yield put(viewInquiryError(inquiryError.detail));
    }
}

function handleHttpError(error: unknown): BackendError {
    if (ValidationHttpError.isInstance(error)) {
        return { detail: error.errorDetail, errors: error.errorsDetails };
    }
    if (HttpError.isInstance(error)) {
        return { detail: error.errorDetail, errors: undefined };
    }
    return { detail: "An unknown error occurred.", errors: undefined };
}

export function* inquirySaga() {
    yield takeLatest(createInquiryStart.type, createNewInquiry);
    yield takeLatest(viewInquiryStart.type, showInquiry);
}