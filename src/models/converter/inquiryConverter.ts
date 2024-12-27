import { CreateInquiryDto } from "../dto/inquiryDto";
import { InquiryCreateFormData } from "../form-data/inquiryFormData";

export function toCreateInquiryDto(formData: InquiryCreateFormData): CreateInquiryDto {
    return {
        ...formData,
        productRefId: formData.productRefId.value,
        customerRefId: formData.customerRefId.value,
        managerRefId: formData.managerRefId.value
    };
}