import { Link, useLoaderData } from "react-router-dom";
import PageContent from "../../components/content/PageContent";
import ROUTES from "../../components/routing/routes";
import Button from "../../components/ui/buttons/Button";
import { InquiryDto } from "@models/dto/inquiryDto";
import { formatDateTime } from "@utils/formatter";
import useProductInitialName from "@hooks/saga/product/useProductInitialName";
import RelationalName from "@components/content/blocks/RelationalName";
import useCustomerInitialName from "@hooks/saga/customer/useCustomerInitialName";
import useManagerInitialName from "@hooks/saga/manager/useManagerInitialName";

export default function InquiryViewPage() {
    const inquiry: InquiryDto = useLoaderData();

    const { productOption, productLoading, productError } = useProductInitialName(inquiry.product);
    const { customerName, customerLoading, customerError } = useCustomerInitialName(inquiry.customer);
    const { managerOption, managerLoading, managerError } = useManagerInitialName(inquiry.manager);

    const id = inquiry.id;

    return (
        <PageContent title="Inquiry">
            <div className="row">
                <div className="col-sm-3">ID</div>
                <div className="col-sm-9">{id}</div>

                <div className="col-sm-3">GUID</div>
                <div className="col-sm-9">{inquiry.guid}</div>

                <div className="col-sm-3">Product</div>
                <div className="col-sm-9">
                    {<RelationalName
                        loading={productLoading}
                        error={productError}
                        name={productOption?.label}
                    />}
                </div>

                <div className="col-sm-3">Manager</div>
                <div className="col-sm-9">
                    {<RelationalName
                        loading={managerLoading}
                        error={managerError}
                        name={managerOption?.label}
                    />}
                </div>

                <div className="col-sm-3">Customer</div>
                <div className="col-sm-9">
                    {<RelationalName
                        loading={customerLoading}
                        error={customerError}
                        name={customerName}
                    />}
                </div>

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
                <Button className="btnPrimary mt-4">Update</Button>
            </Link>
        </PageContent>

    );
}
