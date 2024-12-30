export interface CreateInquiryDto {
    source: string;
    productRefId: string;
    managerRefId: string;
    customerRefId: string;
    comment?: string;
    note?: string;
}
