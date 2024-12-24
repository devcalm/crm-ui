import { all } from "redux-saga/effects";
import { productSaga } from "@redux/sagas/product/productSaga";

export default function* rootSaga() {
    yield all([productSaga()]);
}