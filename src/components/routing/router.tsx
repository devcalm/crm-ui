import React from "react";
import ROUTES from './routes';
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/Home/HomePage";
import RootLayout from "@pages/Root/RootLayout";
import {Fallback} from "./fallback";
import InquiryCreate from "@pages/Inquiry/InquiryCreate";

let Inqueries = React.lazy(() => import("@pages/Inquiry/InquiryListing"));

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: ROUTES.INQUIRIES,
                element: <Inqueries />,
                HydrateFallback: Fallback
            },
            {
                path: ROUTES.INQUIRY_CREATE,
                element: <InquiryCreate />
            }
        ]
    }
]);

export default router; 