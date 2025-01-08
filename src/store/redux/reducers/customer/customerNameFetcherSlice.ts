import { BackendError } from "@models/dto/BackendError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerNameState {
    loading: boolean,
    name?: string
    error?: BackendError,
}

const initialState: CustomerNameState = {
    loading: false,
    name: undefined,
    error: undefined,
}

const slice = createSlice({
    name: 'customerNameFetcher',
    initialState,
    reducers: {
        fetchCustomerNameByGuidStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        fetchCustomerNameByGuidSuccess: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.loading = false;
        },
        fetchCustomerNameByGuidError: (state, action: PayloadAction<BackendError>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchCustomerNameByGuidStart, fetchCustomerNameByGuidSuccess, fetchCustomerNameByGuidError } = slice.actions;
export default slice.reducer;