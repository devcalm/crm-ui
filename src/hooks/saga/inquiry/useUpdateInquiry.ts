import { updateInquiryStart } from "@redux/reducers/inquiry/inquiryUpdateSlice";
import { RootState } from "@redux/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InquiryUpdateFormData } from "src/models/form-data/inquiryFormData";
import { useNavigate } from "react-router-dom";
import ROUTES from "@components/routing/routes";
import { toUpdateInquiryDto } from "@models/converter/inquiryConverter";
import { BackendError } from "@models/dto/BackendError";

interface InquiryUpdateRespose {
    loading: boolean,
    inquiryId: number,
    error?: BackendError,
    handleSubmit: (formData: InquiryUpdateFormData) => void
}

const useUpdateInquiry = (inquiryId: number): InquiryUpdateRespose => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, updated, error } = useSelector((state: RootState) => state.inquiryUpdateReducer);

    useEffect(() => {
        if (updated) {
            navigate(ROUTES.INQUIRY_DETAIL(inquiryId));
        }
    }, [updated, inquiryId, navigate]);

    const handleSubmit = useCallback(
        (formData: InquiryUpdateFormData) => {
            const dto = toUpdateInquiryDto(inquiryId, formData);
            dispatch(updateInquiryStart(dto));
        },
        [dispatch]
    );

    return { loading, inquiryId, error, handleSubmit };
};

export default useUpdateInquiry;