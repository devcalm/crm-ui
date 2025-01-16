import { Link, useLoaderData } from "react-router-dom";
import PageContent from "../../components/content/PageContent";
import ROUTES from "../../components/routing/routes";
import Button from "../../components/ui/buttons/Button";
import { ApiResponsePagination } from "@components/listing/ApiResponsePagination";
import { InquiryDto } from "@models/dto/inquiryDto";
import { formatDateTime, truncate } from "@utils/formatter";
import Actions from "@components/listing/Actions";
import Listing, { Header, HeaderType, Value } from "@components/listing/Listing";
import { enumToOptions } from "@ui/forms/groups/select-group/Option";
import { InquiryStatus } from "@models/enum/InquiryStatus";

export default function InquiryListing() {

    const response: ApiResponsePagination<InquiryDto> = useLoaderData();

    const values = response.content.map((dto: InquiryDto): Value[] => {
        return [
            { key: "id", value: dto.id },
            { key: "source", value: truncate(dto.source) },
            { key: "comment", value: truncate(dto.comment ?? '') },
            { key: "note", value: truncate(dto.note ?? '') },
            { key: "status", value: dto.status },
            { key: "createdAt", value: formatDateTime(dto.createdAt) },
            {
                key: "actions", value:
                    <Actions
                        edit={ROUTES.INQUIRY_EDIT(dto.id)}
                        view={ROUTES.INQUIRY_DETAIL(dto.id)}
                    />
            }
        ];
    });

    const headers: Header[] = [
        { name: "id", type: HeaderType.INPUT },
        { name: "source", type: HeaderType.INPUT },
        { name: "comment", type: HeaderType.INPUT },
        { name: "note", type: HeaderType.INPUT },
        { name: "status", type: HeaderType.DROPDOWN, options: enumToOptions(InquiryStatus) },
        { name: "createdAt", type: HeaderType.DATE },
        { name: "actions", type: HeaderType.ACTION },
    ];

    return (
        <PageContent title="Inquiries">
            {/* <Link to={ROUTES.INQUIRY_CREATE}>
                <Button className="btnSuccess">Create</Button>
            </Link> */}

            <Listing
                headers={headers}
                values={values}
            />
        </PageContent>

    );
}
