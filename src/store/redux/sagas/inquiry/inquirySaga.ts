import { call, put, takeLatest } from 'redux-saga/effects';
import { createInquiry, updateInquiry } from "./inquiryApi";
import { createInquiryStart, createInquirySuccess, createInquiryError } from '@redux/reducers/inquiry/inquiryCreateSlice';
import { CreateInquiryDto, UpdateInquiryDto } from '@models/dto/inquiryDto';
import { PayloadAction } from '@reduxjs/toolkit';
import handleHttpError from '@errors/handleHttpError';
import { updateInquiryStart, updateInquirySuccess } from '@redux/reducers/inquiry/inquiryUpdateSlice';

function* createNewInquiry(action: PayloadAction<CreateInquiryDto>) {
    try {
        const response: number = yield call(createInquiry, action.payload);
        yield put(createInquirySuccess(response));
    } catch (error: unknown) {
        const inquiryError = handleHttpError(error);
        yield put(createInquiryError(inquiryError));
    }
}

function* updateInquiryEntity(action: PayloadAction<UpdateInquiryDto>) {
    try {
        const response: void = yield call(updateInquiry, action.payload);
        yield put(updateInquirySuccess(response));
    } catch (error: unknown) {
        const inquiryError = handleHttpError(error);
        yield put(createInquiryError(inquiryError));
    }
}

export function* inquirySaga() {
    yield takeLatest(createInquiryStart.type, createNewInquiry);
    yield takeLatest(updateInquiryStart.type, updateInquiryEntity);
}