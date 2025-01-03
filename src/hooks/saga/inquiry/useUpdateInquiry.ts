import { updateInquiryStart } from "@redux/reducers/inquiry/inquiryUpdateSlice";
import { RootState } from "@redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InquiryUpdateFormData } from "src/models/form-data/inquiryFormData";
import { useNavigate } from "react-router-dom";
import ROUTES from "@components/routing/routes";
import { toUpdateInquiryDto } from "@models/converter/inquiryConverter";
import { BackendError } from "@models/dto/BackendError";
import { UpdateInquiryDto } from "@models/dto/inquiryDto";

interface InquiryUpdateRespose {
    loading: boolean,
    inquiryId: number,
    error?: BackendError,
    handleSubmit: (formData: InquiryUpdateFormData) => void
}

const useCreateInquiry = (inquiryId: number): InquiryUpdateRespose => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, updated, error } = useSelector((state: RootState) => state.inquiryUpdateReducer);

    if (updated) {
        navigate(ROUTES.INQUIRY_DETAIL(inquiryId));
    }

    const handleSubmit = useCallback(
        (formData: InquiryUpdateFormData) => {
            const dto = toUpdateInquiryDto(inquiryId, formData);
            if (checkIfDtoIsEmpty(dto)) {
                navigate(ROUTES.INQUIRY_DETAIL(inquiryId));
            }
            dispatch(updateInquiryStart(dto));
        },
        [dispatch]
    );

    return { loading, inquiryId, error, handleSubmit };
};

function checkIfDtoIsEmpty(dto: UpdateInquiryDto): boolean {
    return !dto.comment && !dto.managerRefId && !dto.productRefId && !dto.status;
}

export default useCreateInquiry;