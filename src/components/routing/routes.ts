const ROUTES = {
    HOME: '/',
    INQUIRIES: '/inquiries',
    INQUIRY_CREATE: '/inquiries/create',
    INQUIRY_EDIT: (id: number) => `/inquiries/${id}/edit`,
    INQUIRY_DETAIL: (id: number) => `/inquiries/${id}`,
    MANAGERS: '/managers',
    PRODUCTS: '/products',
    CUSTOMERS: '/customers',
};

export default ROUTES;