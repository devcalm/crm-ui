import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@redux/store';
import Option from "@ui/forms/groups/select-group/Option";
import { useCallback } from "react";
import { InputActionMeta } from "react-select";
import { fetchManagersByNameStart } from "@redux/reducers/manager/managerNameFilterSlice";
import { SelectResponse } from "@hooks/saga/response/SelectResponse";

const useManagerNameFilter = (): SelectResponse => {
    const dispatch = useDispatch();
    const { managers, error, loading } = useSelector((state: RootState) => state.managerNameFilterReducer);

    const options: Option[] = managers.map((manager) => ({
        value: manager.guid,
        label: manager.name
    }));

    const handleInputChange = useCallback(
        (inputValue: string, { action }: InputActionMeta) => {
            if (action === 'input-change' && inputValue.trim().length > 2) {
                dispatch(fetchManagersByNameStart(inputValue));
            }
        },
        [dispatch]
    );

    return { options, handleInputChange, error, loading };
};

export default useManagerNameFilter;