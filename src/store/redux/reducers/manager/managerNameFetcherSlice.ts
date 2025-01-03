import { BackendError } from "@models/dto/BackendError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ManagerNameState {
    loading: boolean,
    name?: string
    error?: BackendError,
};

const initialState: ManagerNameState = {
    loading: false,
    name: undefined,
    error: undefined,
};

const slice = createSlice({
    name: 'managerNameFetcher',
    initialState,
    reducers: {
        fetchManagerNameByGuidStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        fetchManagerNameByGuidSuccess: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.loading = false;
        },
        fetchManagerNameByGuidError: (state, action: PayloadAction<BackendError>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchManagerNameByGuidStart, fetchManagerNameByGuidSuccess, fetchManagerNameByGuidError } = slice.actions;
export default slice.reducer;