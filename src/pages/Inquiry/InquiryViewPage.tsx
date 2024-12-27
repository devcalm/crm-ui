import { Link } from "react-router-dom";
import PageContent from "../../components/content/PageContent";
import ROUTES from "../../components/routing/routes";
import Button from "../../components/ui/buttons/Button";

export default function InquiryViewPage() {
    const id = "1";

    return (
        <PageContent title="Inquiries">
            <Link to={ROUTES.INQUIRY_EDIT(id)}>
                <Button className="btnSuccess">Update</Button>
            </Link>
        </PageContent>

    );
}
