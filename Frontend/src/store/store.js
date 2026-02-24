import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

// 🔹 Cart persist config
const cartPersistConfig = {
  key: "cart",
  storage: storageSession,
  whitelist: ["items"], // slice ke andar ka key jahan cart items hain
};

// 🔹 Product persist config
const productPersistConfig = {
  key: "product",
  storage: storageSession,
  whitelist: ["products"], // slice ke andar ka key jahan products hain (agar products key alag ho to change karo)
};

// 🔹 Persisted reducers
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

// 🔹 Store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: persistedProductReducer, // ✅ ab product bhi persist ho raha
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ essential for redux-persist
    }),
});

export const persistor = persistStore(store);