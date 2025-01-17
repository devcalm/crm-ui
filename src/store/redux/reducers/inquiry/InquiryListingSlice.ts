import { ApiResponsePagination } from "@components/listing/ApiResponsePagination";
import { BackendError } from "@models/dto/BackendError";
import { InquiryDto } from "@models/dto/inquiryDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListingInquiryState {
    loading: boolean,
    pagination?: ApiResponsePagination<InquiryDto>
    error?: BackendError
}

const initialState: ListingInquiryState = {
    loading: false,
    pagination: undefined,
    error: undefined,
}

const slice = createSlice({
    name: 'listingInquiry',
    initialState,
    reducers: {
        listingInquiryStart: (state, action: PayloadAction<Record<string, any>>) => {
            state.loading = true;
        },
        listingInquirySuccess: (state, action: PayloadAction<ApiResponsePagination<InquiryDto>>) => {
            state.pagination = action.payload;
            state.loading = false;
        },
        listingInquiryError: (state, action: PayloadAction<BackendError>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { listingInquiryStart, listingInquirySuccess, listingInquiryError } = slice.actions;
export default slice.reducer;