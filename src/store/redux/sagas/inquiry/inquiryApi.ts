import extractInquiryIdFromLocaltionHeader from "./locationExtractor";
import { axiosInquiry } from "@axios/apiClient";
import API from "@axios/apiRoutes";
import { CreateInquiryDto } from "@models/dto/inquiryDto";

export const createInquiry = async (dto: CreateInquiryDto): Promise<number> =>
    await axiosInquiry.request({
        method: 'post',
        url: API.INQUIRY,
        data: JSON.stringify(dto)
    }).then(response => extractInquiryIdFromLocaltionHeader(response.headers['location']));
