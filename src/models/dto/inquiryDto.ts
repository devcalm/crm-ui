export interface CreateInquiryDto {
    source: string;
    productRefId: string;
    managerRefId: string;
    customerRefId: string;
    comment?: string;
    note?: string;
}

export interface InquiryDto {
    id: number;
    guid: string;
    productRefId: string;
    managerRefId: string;
    customerRefId: string;
    comment?: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
}
