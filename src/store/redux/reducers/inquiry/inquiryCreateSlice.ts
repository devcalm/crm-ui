import { CreateInquiryDto } from "@models/dto/inquiryDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateInquiryState {
    loading: boolean,
    inquiryId: number
    error?: string,
    errors?: any[]
}

const initialState: CreateInquiryState  = {
    loading: false,
    inquiryId: 0,
    error: undefined,
    errors: undefined
};

const slice = createSlice({
    name: 'createInquiry',
    initialState,
    reducers: {
        createInquiryStart: (state, action: PayloadAction<CreateInquiryDto>) => {
            state.loading = true;
        },
        createInquirySuccess: (state, action: PayloadAction<number>) => {
            state.inquiryId = action.payload;
            state.loading = false;
        },
        createInquiryError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { createInquiryStart, createInquirySuccess, createInquiryError } = slice.actions;
export default slice.reducer;