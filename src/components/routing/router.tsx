import React from "react";
import ROUTES from './routes';
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/Home/HomePage";
import RootLayout from "@pages/Root/RootLayout";
import { Fallback } from "./fallback";
import InquiryCreate from "@pages/Inquiry/InquiryCreate";
import { inquiryLoader, inquiriesLoader } from "./loaders";
import ProtectedRoute from "./ProtectedRoute";

let Inquires = React.lazy(() => import("@pages/Inquiry/InquiryListing"));
let InquiryEdit = React.lazy(() => import("@pages/Inquiry/InquiryUpdate"));
let InquiryView = React.lazy(() => import("@pages/Inquiry/InquiryViewPage"));

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: ROUTES.INQUIRIES,
                element: <Inquires />,
                HydrateFallback: Fallback
            },
            {
                path: ROUTES.INQUIRY_CREATE,
                element: (
                    <ProtectedRoute element={<InquiryCreate />} />
                ),
            },
            {
                path: ROUTES.INQUIRY_DETAIL(':id'),
                element: <InquiryView />,
                loader: inquiryLoader,
                HydrateFallback: Fallback
            },
            {
                path: ROUTES.INQUIRY_EDIT(':id'),
                element: <InquiryEdit />,
                loader: inquiryLoader,
                HydrateFallback: Fallback
            }
        ]
    }
]);

export default router; 