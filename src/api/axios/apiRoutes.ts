const API = {
    PRODUCT: "/product",
    PRODUCT_SEARCH: "/product/search",
    PRODUCT_NAME_FETCH: (id: string) => `/product/${id}/name`,
    CUSTOMER: "/customer",
    CUSTOMER_SEARCH: "/customer/search",
    CUSTOMER_NAME_FETCH: (id: string) => `/customer/${id}/name`,
    MANAGER: "/manager",
    MANAGER_SEARCH: "/manager/search",
    MANAGER_NAME_FETCH: (id: string) => `/manager/${id}/name`,
    INQUIRY: "/inquiry",
    INQUIRY_VIEW: (id: number) => `/inquiry/${id}`,
};

export default API;