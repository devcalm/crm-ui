import { BackendError } from "@models/dto/BackendError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductNameState {
    loading: boolean,
    name?: string
    error?: BackendError,
};

const initialState: ProductNameState = {
    loading: false,
    name: undefined,
    error: undefined,
};

const slice = createSlice({
    name: 'productNameFetcher',
    initialState,
    reducers: {
        fetchProductNameByGuidStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        fetchProductNameByGuidSuccess: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.loading = false;
        },
        fetchProductNameByGuidError: (state, action: PayloadAction<BackendError>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchProductNameByGuidStart, fetchProductNameByGuidSuccess, fetchProductNameByGuidError } = slice.actions;
export default slice.reducer;