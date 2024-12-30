export default function extractInquiryIdFromLocaltionHeader(location?: string): number {
    if (location) {
        let id = Number(location.split("/").pop());
        if (isNaN(id)) {
            throw new Error("Incorrect inquiry identifier.");
        }
        return id;
    }
    throw new Error("Location header is not set.");
}