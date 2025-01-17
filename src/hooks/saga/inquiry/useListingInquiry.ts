import { ApiResponsePagination } from "@components/listing/ApiResponsePagination";
import { BackendError } from "@models/dto/BackendError";
import { InquiryDto } from "@models/dto/inquiryDto";
import { listingInquiryStart } from "@redux/reducers/inquiry/InquiryListingSlice";
import { RootState } from "@redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

interface InquiryListingResponse {
    loading?: boolean,
    pagination?: ApiResponsePagination<InquiryDto>,
    error?: BackendError,
    handleQueryParams: (params: URLSearchParams) => void
}

const useListingInquiry = (): InquiryListingResponse => {
    const dispatch = useDispatch();

    const { loading, pagination, error } = useSelector((state: RootState) => state.inquiryLisitingReducer);

    const handleQueryParams = useCallback(
        (params: URLSearchParams): void => {
            dispatch(listingInquiryStart(Object.fromEntries(params.entries())))
        },
        [dispatch]
    );

    return { loading, pagination, error, handleQueryParams };
}

export default useListingInquiry;
