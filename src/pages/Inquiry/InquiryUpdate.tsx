import PageContent from "@components/content/PageContent";
// import InquiryUpdateForm from "./InquiryUpdateForm";
import { useLoaderData } from "react-router-dom";

export default function InquiryCreate() {
    const inquiry = useLoaderData();
    const title = `Update inquiry: ${inquiry.id}`;

    return (
        <PageContent title={title}>  
            {/* <InquiryUpdateForm inquiry={inquiry}/> */}
        </PageContent>
    );
}