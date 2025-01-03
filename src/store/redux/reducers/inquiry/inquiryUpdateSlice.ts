import { BackendError } from "@models/dto/BackendError";
import { UpdateInquiryDto } from "@models/dto/inquiryDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateInquiryState {
    loading: boolean,
    updated: boolean
    error?: BackendError
}

const initialState: UpdateInquiryState = {
    loading: false,
    updated: false,
    error: undefined,
};

const slice = createSlice({
    name: 'updateInquiry',
    initialState,
    reducers: {
        updateInquiryStart: (state, action: PayloadAction<UpdateInquiryDto>) => {
            state.loading = true;
        },
        updateInquirySuccess: (state, action: PayloadAction<void>) => {
            state.updated = true;
            state.loading = false;
        },
        updateInquiryError: (state, action: PayloadAction<BackendError>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { updateInquiryStart, updateInquirySuccess, updateInquiryError } = slice.actions;
export default slice.reducer;