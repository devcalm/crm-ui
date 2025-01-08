import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "@redux/store";
import { fetchCustomerNameByGuidStart } from "@redux/reducers/customer/customerNameFetcherSlice";
import ValidationFormError from "@models/form-data/ValidationFormError";

interface CustomerInitialResponse {
    customerLoading?: boolean,
    customerName?: string,
    customerError?: ValidationFormError
};

export default function useCustomerInitialName(guid: string): CustomerInitialResponse {
    const dispatch = useDispatch();
    let customerName: string | undefined;
    let customerError: ValidationFormError | undefined;

    const hasFetched = useRef(false);
    const { name, loading: customerLoading, error } = useSelector((state: RootState) => state.customerNameFetcherReducer);

    if (hasFetched.current) {
        if (name) {
            customerName = name;
        } else if (error) {
            customerError = {
                type: "backend",
                message: error.detail
            }
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchCustomerNameByGuidStart(guid));
            hasFetched.current = true;
        }
    }, [dispatch, guid])

    return { customerLoading, customerName, customerError };
};

