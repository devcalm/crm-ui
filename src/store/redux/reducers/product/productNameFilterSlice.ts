import { createError, ValidationResponse } from '@hooks/validation/useValidationState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    guid: string,
    name: string
}

interface ProductState {
    products: Product[],
    loading: boolean,
    error?: ValidationResponse;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: undefined
}

const productSlice = createSlice({
    name: 'productNameFilter',
    initialState,
    reducers: {
        fetchProductsByNameStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = undefined;
        },
        fetchProductsByNameSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsByNameError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = createError(action.payload);
        }
    }
});


export const { fetchProductsByNameStart, fetchProductsByNameSuccess, fetchProductsByNameError } = productSlice.actions;
export default productSlice.reducer;