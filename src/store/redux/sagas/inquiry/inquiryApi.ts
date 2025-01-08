import extractInquiryIdFromLocaltionHeader from "./locationExtractor";
import { axiosInquiry } from "@axios/apiClient";
import API from "@axios/apiRoutes";
import { CreateInquiryDto, UpdateInquiryDto } from "@models/dto/inquiryDto";

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
