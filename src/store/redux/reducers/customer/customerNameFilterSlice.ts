import { createError, ValidationResponse } from '@hooks/validation/useValidationState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
    guid: string,
    name: string
}

interface CustomerState {
    customers: Customer[],
    loading: boolean,
    error?: ValidationResponse;
}

const initialState: CustomerState = {
    customers: [],
    loading: false,
    error: undefined
}

const customerSlice = createSlice({
    name: 'customersNameFilter',
    initialState,
    reducers: {
        fetchCustomersByNameStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = undefined;
        },
        fetchCustomersByNameSuccess: (state, action: PayloadAction<Customer[]>) => {
            state.loading = false;
            state.customers = action.payload;
        },
        fetchCustomersByNameError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = createError(action.payload);
        }
    }
});

export const { fetchCustomersByNameStart, fetchCustomersByNameSuccess, fetchCustomersByNameError } = customerSlice.actions;
export default customerSlice.reducer;