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
    product: string;
    manager: string;
    customer: string;
    source: string;
    comment?: string;
    note?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateInquiryDto {
    id: number,
    productRefId?: string;
    managerRefId?: string;
    status?: string;
}
