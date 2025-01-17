import extractInquiryIdFromLocaltionHeader from "./locationExtractor";
import { axiosInquiry } from "@axios/apiClient";
import API from "@axios/apiRoutes";
import { ApiResponsePagination } from "@components/listing/ApiResponsePagination";
import { CreateInquiryDto, InquiryDto, UpdateInquiryDto } from "@models/dto/inquiryDto";

export const createInquiry = async (dto: CreateInquiryDto): Promise<number> =>
    await axiosInquiry.request({
        method: 'post',
        url: API.INQUIRY,
        data: JSON.stringify(dto)
    }).then(response => extractInquiryIdFromLocaltionHeader(response.headers['location']));

export const updateInquiry = async (dtoUpdate: UpdateInquiryDto): Promise<void> => {
    const { id, ...dto } = dtoUpdate;
    await axiosInquiry.request({
        method: 'patch',
        url: API.INQUIRY_VIEW(id),
        data: JSON.stringify(dto)
    });
}

export const listingInquiry = async (params: Record<string, any>): Promise<ApiResponsePagination<InquiryDto>> =>
    await axiosInquiry.request({
        method: 'get',
        params: params,
        url: API.INQUIRY,
    }).then(response => response.data);