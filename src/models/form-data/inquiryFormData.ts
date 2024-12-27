import Option from "@ui/forms/groups/select-group/Option";

export interface InquiryCreateFormData {
    source: string;
    productRefId: Option;
    managerRefId: Option;
    customerRefId: Option;
    comment?: string;
    note?: string;
}