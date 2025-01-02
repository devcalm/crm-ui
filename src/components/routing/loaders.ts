import { InquiryDto } from "@models/dto/inquiryDto";
import { axiosInquiry } from "@axios/apiClient";
import API from "@axios/apiRoutes";
import { LoaderFunctionArgs } from "react-router-dom";


export async function inquiryLoader({ params }: LoaderFunctionArgs): Promise<InquiryDto> {
    const id = requireParam(params.id, "Inquiry ID");
    return await axiosInquiry.request({
        method: 'get',
        url: API.INQUIRY_VIEW(+id)
    }).then(response => response.data as InquiryDto);
}

function requireParam<T>(param: T | undefined, paramName: string): T {
    if (param === undefined) {
        throw new Error(`${paramName} is required`);
    }
    return param;
}



