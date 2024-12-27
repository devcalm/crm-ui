import { call, put, debounce } from 'redux-saga/effects';
import { createInquiry } from "./inquiryApi";
import {
    createInquiryStart,
    createInquirySuccess,
    createInquiryError
} from '@redux/reducers/inquiry/inquiryCreateSlice';
import { HttpError } from '@errors/HttpError';
import { CreateInquiryDto } from '@models/dto/inquiryDto';

interface createInquiryAction {
    type: string,
    payload: CreateInquiryDto
}

function* createNewInquiry(action: createInquiryAction) {
    try {
        const response: number = yield call(createInquiry, action.payload);
        yield put(createInquirySuccess(response));
    } catch (error: unknown) {
        const errorMessage = HttpError.isInstance(error)
            ? error.errorDetail
            : 'Unknown error';
        yield put(createInquiryError(errorMessage));
    }
}

export function* customerSaga() {
    yield debounce(300, createInquiryStart.type, createNewInquiry);
}