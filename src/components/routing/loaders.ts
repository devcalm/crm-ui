import { InquiryDto } from "@models/dto/inquiryDto";
import { axiosInquiry } from "@axios/apiClient";
import API from "@axios/apiRoutes";
import { LoaderFunctionArgs } from "react-router-dom";
import { ApiResponsePagination } from "@components/listing/ApiResponsePagination";

export async function inquiryLoader({ params }: LoaderFunctionArgs): Promise<InquiryDto> {
    const id = requireParam(params.id, "Inquiry ID");
    return await axiosInquiry.request({
        method: 'get',
        url: API.INQUIRY_VIEW(+id)
    }).then(response => response.data as InquiryDto);
}

export async function inquiriesLoader({ params }: LoaderFunctionArgs): Promise<ApiResponsePagination<InquiryDto>> {
    return await axiosInquiry.request({
        method: 'get',
        params: params,
        url: API.INQUIRY
    }).then(response => response.data);
}

function requireParam<T>(param: T | undefined, paramName: string): T {
    if (param === undefined) {
        throw new Error(`${paramName} is required`);
    }
    return param;
}



