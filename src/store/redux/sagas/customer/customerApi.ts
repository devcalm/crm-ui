import { axiosCustomer } from "@axios/apiClient";
import { Customer as CustomerNameFilter } from "@redux/reducers/customer/customerNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<CustomerNameFilter[]> =>
    await axiosCustomer.request({
        method: 'get',
        url: API.CUSTOMER_SEARCH,
        params: { name }
    }).then(result => result.data);

export const getCustomerNameByGuid = async (id: string): Promise<string> =>
    await axiosCustomer.request({
        method: 'get',
        url: API.CUSTOMER_NAME_FETCH(id),
    }).then(result => result.data);   