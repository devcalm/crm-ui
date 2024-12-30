import { all } from "redux-saga/effects";
import { productSaga } from "@redux/sagas/product/productSaga";
import { customerSaga } from "@redux/sagas/customer/customerSaga";
import { managerSaga } from "@redux/sagas/manager/managerSaga";
import { inquirySaga } from "@redux/sagas/inquiry/inquirySaga";

export default function* rootSaga() {
    yield all([productSaga(), customerSaga(), managerSaga(), inquirySaga()]);
}