import { axiosProduct, isAxiosResponse } from "@axios/apiClient";
import { Product as ProductNameFilter } from "@redux/reducers/product/productNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<ProductNameFilter[]> => {
    const res = await axiosProduct.request({
        method: 'get',
        url: API.PRODUCT_SEARCH,
        params: { name }
    });
    if (isAxiosResponse(res)) {
        return res.data;
    }
    throw Error("Incorrect response");
};
