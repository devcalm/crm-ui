import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import productNameFilterReducer from "@redux/reducers/product/productNameFilterSlice";
import customerNameFilterReducer from "@redux/reducers/customer/customerNameFilterSlice";
import managerNameFilterReducer from "@redux/reducers/manager/managerNameFilterSlice";
import productNameFetcherReducer from "@redux/reducers/product/productNameFetcherSlice";
import customerNameFetcherReducer from "@redux/reducers/customer/customerNameFetcherSlice";
import managerNameFetcherReducer from "@redux/reducers/manager/managerNameFetcherSlice";
import inquiryCreateReducer from "@redux/reducers/inquiry/inquiryCreateSlice";
import inquiryUpdateReducer from "@redux/reducers/inquiry/inquiryUpdateSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        productNameFilterReducer,
        customerNameFilterReducer,
        managerNameFilterReducer,
        inquiryCreateReducer,
        inquiryUpdateReducer,
        productNameFetcherReducer,
        customerNameFetcherReducer,
        managerNameFetcherReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;