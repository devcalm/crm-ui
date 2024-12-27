import { createInquiryStart } from "@redux/reducers/inquiry/inquiryCreateSlice";
import { RootState } from "@redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InquiryCreateFormData } from "src/models/form-data/inquiryFormData";
import { useNavigate } from "react-router-dom";
import ROUTES from "@components/routing/routes";
import { toCreateInquiryDto } from "@models/converter/inquiryConverter";

interface InquiryCreateRespose {
    loading: boolean,
    inquiryId: number,
    error?: string,
    handleSubmit: (formData: InquiryCreateFormData) => void
}

const useCreateInquiry = (): InquiryCreateRespose => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, inquiryId, error } = useSelector((state: RootState) => state.inquiryCreateReducer);

    if (inquiryId) {
        navigate(ROUTES.INQUIRY_DETAIL(inquiryId));
    }

    const handleSubmit = useCallback(
        (formData: InquiryCreateFormData) => {
            const dto = toCreateInquiryDto(formData);
            dispatch(createInquiryStart(dto));
        },
        [dispatch]
    );


    return { loading, inquiryId, error, handleSubmit };
};

export default useCreateInquiry;