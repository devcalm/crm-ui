import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import productNameFilterReducer from "@redux/reducers/product/productNameFilterSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        productNameFilterReducer: productNameFilterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;