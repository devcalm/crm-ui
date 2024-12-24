import { axiosProduct, isAxiosResponse } from "@axios/apiClient";
import { ApiResponse as ProductNameFilterResponse } from "@redux/reducers/product/productNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<ProductNameFilterResponse> => {
    const res = await axiosProduct.request({
        method: 'get',
        url: API.PRODUCT_SEARCH,
        params: { name }
    });
    if (isAxiosResponse(res)) {
        return {
            data: res.data
        };
    }
    throw new Error(res.message);
};
