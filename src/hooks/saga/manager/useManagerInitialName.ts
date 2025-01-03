import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "@redux/store";
import { fetchManagerNameByGuidStart } from "@redux/reducers/manager/managerNameFetcherSlice";
import Option from "@ui/forms/groups/select-group/Option";
import ValidationFormError from "@models/form-data/ValidationFormError";

interface ManagerInitialResponse {
    managerOption?: Option,
    managerError?: ValidationFormError
};

export default function useManagerInitialName(guid: string): ManagerInitialResponse {
    const dispatch = useDispatch();
    let managerOption: Option | undefined;
    let managerError: ValidationFormError | undefined;

    const hasFetched = useRef(false);
    const { name, error } = useSelector((state: RootState) => state.managerNameFetcherReducer);

    if (hasFetched.current) {
        if (name) {
            managerOption = {
                value: guid,
                label: name
            };
        } else if (error) {
            managerError = {
                type: "backend",
                message: error.detail
            }
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchManagerNameByGuidStart(guid));
            hasFetched.current = true;
        }
    }, [dispatch, guid])

    return { managerOption, managerError };
};

