import { axiosProduct } from "@axios/apiClient";
import { Product as ProductNameFilter } from "@redux/reducers/product/productNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<ProductNameFilter[]> =>
    await axiosProduct.request({
        method: 'get',
        url: API.PRODUCT_SEARCH,
        params: { name }
    }).then(result => result.data);

