import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@redux/store';
import Option from "@ui/forms/groups/select-group/Option";
import { useCallback } from "react";
import { InputActionMeta } from "react-select";
import { fetchProductsByNameStart } from "@redux/reducers/product/productNameFilterSlice";
import { SelectResponse } from "@hooks/saga/response/SelectResponse";

const useProductNameFilter = (): SelectResponse => {
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

    return { options, handleInputChange, error, loading };
};

export default useProductNameFilter;