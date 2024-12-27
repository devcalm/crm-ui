import { all } from "redux-saga/effects";
import { productSaga } from "@redux/sagas/product/productSaga";
import { customerSaga } from "@redux/sagas/customer/customerSaga";
import { managerSaga } from "@redux/sagas/manager/managerSaga";

export default function* rootSaga() {
    yield all([productSaga(), customerSaga(), managerSaga()]);
}