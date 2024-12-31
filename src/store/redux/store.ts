import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import productNameFilterReducer from "@redux/reducers/product/productNameFilterSlice";
import customerNameFilterReducer from "@redux/reducers/customer/customerNameFilterSlice";
import managerNameFilterReducer from "@redux/reducers/manager/managerNameFilterSlice";
import inquiryCreateReducer from "@redux/reducers/inquiry/inquiryCreateSlice";
import inquiryViewReducer from "@redux/reducers/inquiry/InquiryViewSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        productNameFilterReducer,
        customerNameFilterReducer,
        managerNameFilterReducer,
        inquiryCreateReducer,
        inquiryViewReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;