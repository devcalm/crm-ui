import { AxiosHeaders, AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export default function extractInquiryIdFromLocaltionHeader(headers: RawAxiosResponseHeaders | AxiosResponseHeaders): number {
    if (headers instanceof AxiosHeaders && headers.has("Location")) {
        let url = new URL(headers['Location']);
        let id = Number(url.pathname.split("/").pop());
        if (isNaN(id)) {
            throw new Error("Incorrect inquiry identifier.");
        }
        return id;
    }
    throw new Error("Location header is not set.");
}