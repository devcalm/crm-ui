import { call, put, takeLatest } from 'redux-saga/effects';
import { createInquiry } from "./inquiryApi";
import { createInquiryStart, createInquirySuccess, createInquiryError } from '@redux/reducers/inquiry/inquiryCreateSlice';
import { CreateInquiryDto } from '@models/dto/inquiryDto';
import { PayloadAction } from '@reduxjs/toolkit';
import handleHttpError from '@errors/handleHttpError';

function* createNewInquiry(action: PayloadAction<CreateInquiryDto>) {
    try {
        const response: number = yield call(createInquiry, action.payload);
        yield put(createInquirySuccess(response));
    } catch (error: unknown) {
        const inquiryError = handleHttpError(error);
        yield put(createInquiryError(inquiryError));
    }
}

export function* inquirySaga() {
    yield takeLatest(createInquiryStart.type, createNewInquiry);
}