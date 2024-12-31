import { InquiryDto } from "@models/dto/inquiryDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateInquiryState {
    loading: boolean,
    inquiry?: InquiryDto
    error?: string
}

const initialState: CreateInquiryState  = {
    loading: false,
    inquiry: undefined,
    error: undefined,
};

const slice = createSlice({
    name: 'viewInquiry',
    initialState,
    reducers: {
        viewInquiryStart: (state, action: PayloadAction<number>) => {
            state.loading = true;
        },
        viewInquirySuccess: (state, action: PayloadAction<InquiryDto>) => {
            state.inquiry = action.payload;
            state.loading = false;
        },
        viewInquiryError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { viewInquiryStart, viewInquirySuccess, viewInquiryError } = slice.actions;
export default slice.reducer;