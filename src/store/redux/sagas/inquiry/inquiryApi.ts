import extractInquiryIdFromLocaltionHeader from "./locationExtractor";
import { axiosInquiry } from "@axios/apiClient";
import API from "@axios/apiRoutes";
import { CreateInquiryDto, InquiryDto } from "@models/dto/inquiryDto";

export const createInquiry = async (dto: CreateInquiryDto): Promise<number> =>
    await axiosInquiry.request({
        method: 'post',
        url: API.INQUIRY,
        data: JSON.stringify(dto)
    }).then(response => extractInquiryIdFromLocaltionHeader(response.headers['location']));

export const viewInquiry = async (id: number): Promise<InquiryDto> =>
    await axiosInquiry.request({
        method: 'get',
        url: API.INQUIRY_VIEW(id)
    }).then(response => response.data as InquiryDto);

