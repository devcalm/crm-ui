import { BackendError } from "@models/dto/BackendError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerNameState {
    loading: boolean,
    name?: string
    error?: BackendError
}

const initialState: CustomerNameState = {
    loading: false,
    name: undefined,
    error: undefined,
};

const slice = createSlice({
    name: 'customerNameFetcher',
    initialState,
    reducers: {
        fetchCustomerByNameStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        fetchCustomerByNameSuccess: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.loading = false;
        },
        fetchCustomerByNameError: (state, action: PayloadAction<BackendError>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchCustomerByNameStart, fetchCustomerByNameSuccess, fetchCustomerByNameError } = slice.actions;
export default slice.reducer;