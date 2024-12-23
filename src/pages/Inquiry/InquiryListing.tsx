import { Link } from "react-router-dom";
import PageContent from "../../components/content/PageContent";
import ROUTES from "../../components/routing/routes";
import Button from "../../components/ui/buttons/Button";

export default function InquiryListing() {


    return (
        <PageContent title="Inquiries">
            <Link to={ROUTES.INQUIRY_CREATE}>
                <Button className="btnSuccess">Create</Button>
            </Link>
        </PageContent>

    );
}
