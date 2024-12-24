import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    guid: string,
    name: string
}

interface ProductState {
    products: Product[],
    loading: boolean,
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: 'productNameFilter',
    initialState,
    reducers: {
        fetchProductsByNameStart: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsByNameSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsByNameError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export interface ApiResponse {
    data: Product[];
}

export const { fetchProductsByNameStart, fetchProductsByNameSuccess, fetchProductsByNameError } = productSlice.actions;
export default productSlice.reducer;