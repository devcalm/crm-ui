const API = {
    PRODUCT: "/product",
    PRODUCT_SEARCH: "/product/search",
    CUSTOMER: "/customer",
    CUSTOMER_SEARCH: "/customer/search",
    MANAGER: "/manager",
    MANAGER_SEARCH: "/manager/search",
    INQUIRY: "/inquiry",
    INQUIRY_VIEW: (id: number) => `/inquiry/${id}`,
};

export default API;