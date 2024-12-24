import { fetchProductsByNameStart } from '@redux/reducers/product/productNameFilterSlice';
import { RootState } from '@redux/store';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ActionMeta, SingleValue, InputActionMeta } from 'react-select';

interface Option {
    value: string;
    label: string;
}

const ProductFilterSelect: React.FC = () => {
    const dispatch = useDispatch();
    const { products, error, loading } = useSelector((state: RootState) => state.productNameFilterReducer);

    const options: Option[] = products.map((product) => ({
        value: product.guid,
        label: product.name
    }));

    const handleInputChange = useCallback(
        (inputValue: string, { action }: InputActionMeta) => {
            if (action === 'input-change' && inputValue.trim().length > 2) {
                dispatch(fetchProductsByNameStart(inputValue));
            }
        },
        [dispatch]
    );

    const handleChange = (selectedOption: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        console.log('Selected product:', selectedOption);
        console.log('Meta:', actionMeta);
    };

    return <Select
        options={options}
        isLoading={loading}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder="Search for a product..."
        isClearable
    />;
};

export default ProductFilterSelect;
