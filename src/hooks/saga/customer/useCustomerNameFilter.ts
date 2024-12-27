import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@redux/store';
import Option from "@ui/forms/groups/select-group/Option";
import { useCallback } from "react";
import { InputActionMeta } from "react-select";
import { fetchCustomersByNameStart } from "@redux/reducers/customer/customerNameFilterSlice";
import { SelectResponse } from "@hooks/saga/response/SelectResponse";

const useCustomerNameFilter = (): SelectResponse => {
    const dispatch = useDispatch();
    const { customers, error, loading } = useSelector((state: RootState) => state.customerNameFilterReducer);

    const options: Option[] = customers.map((customer) => ({
        value: customer.guid,
        label: customer.name
    }));

    const handleInputChange = useCallback(
        (inputValue: string, { action }: InputActionMeta) => {
            if (action === 'input-change' && inputValue.trim().length > 2) {
                dispatch(fetchCustomersByNameStart(inputValue));
            }
        },
        [dispatch]
    );

    return { options, handleInputChange, error, loading };
}

export default useCustomerNameFilter;