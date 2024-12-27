import { axiosManager } from "@axios/apiClient";
import { Manager as ManagerNameFilter } from "@redux/reducers/manager/managerNameFilterSlice";
import API from "@axios/apiRoutes";

export const searchByName = async (name: string): Promise<ManagerNameFilter[]> =>
    await axiosManager.request({
        method: 'get',
        url: API.MANAGER_SEARCH,
        params: { name }
    }).then(result => result.data);