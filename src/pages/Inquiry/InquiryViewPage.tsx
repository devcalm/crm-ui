import { Link, useLoaderData } from "react-router-dom";
import PageContent from "../../components/content/PageContent";
import ROUTES from "../../components/routing/routes";
import Button from "../../components/ui/buttons/Button";
import { InquiryDto } from "@models/dto/inquiryDto";
import { formatDateTime } from "@utils/formatter";

export default function InquiryViewPage() {
    const inquiry: InquiryDto = useLoaderData();

    const id = inquiry.id;

    return (
        <PageContent title="Inquiries">
            <div className="row">
                <div className="col-sm-3">ID</div>
                <div className="col-sm-9">{id}</div>

                <div className="col-sm-3">GUID</div>
                <div className="col-sm-9">{inquiry.guid}</div>

                <div className="col-sm-3">Comment</div>
                <div className="col-sm-9">{inquiry.comment}</div>

                <div className="col-sm-3">Note</div>
                <div className="col-sm-9">{inquiry.note}</div>

                <div className="col-sm-3">Status</div>
                <div className="col-sm-9">{inquiry.status}</div>

                <div className="col-sm-3">Created At</div>
                <div className="col-sm-9">{formatDateTime(inquiry.createdAt)}</div>

                <div className="col-sm-3">Updated At</div>
                <div className="col-sm-9">{formatDateTime(inquiry.updatedAt)}</div>
            </div>

            <Link to={ROUTES.INQUIRY_EDIT(id)}>
                <Button className="btnSuccess mt-3">Update</Button>
            </Link>
        </PageContent>

    );
}
