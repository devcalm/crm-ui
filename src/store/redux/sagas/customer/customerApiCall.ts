import { axiosCustomer, isAxiosResponse } from "@axios/apiClient";
import { Customer as CustomerNameFilter } from "@redux/reducers/customer/customerNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<CustomerNameFilter[]> => {
    const res = await axiosCustomer.request({
        method: 'get',
        url: API.CUSTOMER_SEARCH,
        params: { name }
    });
    if (isAxiosResponse(res)) {
        return res.data;
    }
    throw Error("Incorrect response");
};
