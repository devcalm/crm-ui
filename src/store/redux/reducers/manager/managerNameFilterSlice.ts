import { createError, ValidationResponse } from '@hooks/validation/useValidationState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Manager {
    guid: string,
    name: string
}

interface CustomerState {
    managers: Manager[],
    loading: boolean,
    error?: ValidationResponse;
}

const initialState: CustomerState = {
    managers: [],
    loading: false,
    error: undefined
};

const managerSlice = createSlice({
    name: 'managerNameFilter',
    initialState,
    reducers: {
        fetchManagersByNameStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = undefined;
        },
        fetchManagersByNameSuccess: (state, action: PayloadAction<Manager[]>) => {
            state.loading = false;
            state.managers = action.payload;
        },
        fetchManagersByNameError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = createError(action.payload);
        }
    }
});

export const { fetchManagersByNameStart, fetchManagersByNameSuccess, fetchManagersByNameError } = managerSlice.actions;
export default managerSlice.reducer;