import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "@redux/store";
import { fetchProductNameByGuidStart } from "@redux/reducers/product/productNameFetcherSlice";
import Option from "@ui/forms/groups/select-group/Option";
import ValidationFormError from "@models/form-data/ValidationFormError";

interface ProductInitialResponse {
    productLoading?: boolean
    productOption?: Option,
    productError?: ValidationFormError
};

export default function useProductInitialName(guid: string): ProductInitialResponse {
    const dispatch = useDispatch();
    let productOption: Option | undefined;
    let productError: ValidationFormError | undefined;

    const hasFetched = useRef(false);
    const { name, loading: productLoading, error } = useSelector((state: RootState) => state.productNameFetcherReducer);

    if (hasFetched.current) {
        if (name) {
            productOption = {
                value: guid,
                label: name
            };
        } else if (error) {
            productError = {
                type: "backend",
                message: error.detail
            }
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchProductNameByGuidStart(guid));
            hasFetched.current = true;
        }
    }, [dispatch, guid])

    return { productLoading, productOption, productError };
};