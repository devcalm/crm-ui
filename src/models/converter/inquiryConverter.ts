import { CreateInquiryDto, UpdateInquiryDto } from "../dto/inquiryDto";
import { InquiryCreateFormData, InquiryUpdateFormData } from "../form-data/inquiryFormData";

export function toCreateInquiryDto(formData: InquiryCreateFormData): CreateInquiryDto {
    return {
        ...formData,
        productRefId: formData.productRefId.value,
        customerRefId: formData.customerRefId.value,
        managerRefId: formData.managerRefId.value
    };
}

export function toUpdateInquiryDto(id: number, formData: InquiryUpdateFormData): UpdateInquiryDto {
    return {
        id,
        productRefId: formData?.productRefId?.value,
        managerRefId: formData?.managerRefId?.value,
        status: formData?.status?.value,
        comment: formData.comment
    };
}