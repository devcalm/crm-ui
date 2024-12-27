import { axiosCustomer } from "@axios/apiClient";
import { Customer as CustomerNameFilter } from "@redux/reducers/customer/customerNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<CustomerNameFilter[]> => 
    await axiosCustomer.request({
        method: 'get',
        url: API.CUSTOMER_SEARCH,
        params: { name }
    }).then(result => result.data);
    