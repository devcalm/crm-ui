import React from "react";
import ROUTES from './routes';
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/Home/HomePage";
import RootLayout from "@pages/Root/RootLayout";
import {Fallback} from "./fallback";
import InquiryCreate from "@pages/Inquiry/InquiryCreate";
import InquiryViewPage from "@pages/Inquiry/InquiryViewPage";
import { inquiryLoader } from "./loaders";

let Inquires = React.lazy(() => import("@pages/Inquiry/InquiryListing"));
let Inquiry = React.lazy(() => import("@pages/Inquiry/InquiryUpdate"));

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
                element: <InquiryCreate />
            },
            {
                path: ROUTES.INQUIRY_DETAIL(':id'),
                element: <InquiryViewPage />
            },
            {
                path: ROUTES.INQUIRY_EDIT(':id'),
                element: <Inquiry />,
                loader: inquiryLoader,
                HydrateFallback: Fallback
            }
        ]
    }
]);

export default router; 