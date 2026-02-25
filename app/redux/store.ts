// Redux Toolkit ka main function jo store banata hai
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import checkoutReducer from "./features/checkoutSlice";
// RTK Query API slice (backend communication ke liye)
import { apiSlice } from "./api/apiSlice";

// Normal Redux slices (client side state)
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

// Redux Persist (refresh ke baad state bachane ke liye)
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Persist ke internal actions (error avoid karne ke liye)
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

/*
=================================================
1️⃣ Combine All Reducers
Ye sab slices ko ek root reducer me merge karta hai.
Big projects me hamesha combineReducers use hota hai.
=================================================
*/

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  checkout: checkoutReducer, // ✅ Add this
  [apiSlice.reducerPath]: apiSlice.reducer,
});

/*
=================================================
2️⃣ Persist Config
Yaha decide hota hai kya browser me save hoga.
=================================================
*/

const persistConfig = {
  key: "root", // localStorage key name
  storage, // localStorage use karega
  whitelist: ["cart", "auth"],
  // sirf cart & auth refresh ke baad survive karega
};

/*
=================================================
3️⃣ Persisted Reducer
Normal reducer ko persist wala reducer me convert karta hai.
=================================================
*/

const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
=================================================
4️⃣ Create Store (App ka Main Brain)
Sirf EK baar banana hota hai.
=================================================
*/

export const store = configureStore({
  reducer: persistedReducer, // persisted root reducer use ho raha hai

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ye Redux Persist ke warnings ko ignore karta hai
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // RTK Query middleware add karna zaroori hota hai
      .concat(apiSlice.middleware),
});

/*
=================================================
5️⃣ Persistor
Ye Redux Persist ko activate karta hai.
ReduxProvider me use hota hai.
=================================================
*/

export const persistor = persistStore(store);

/*
=================================================
6️⃣ TypeScript Support
Large projects me strongly recommended.
=================================================
*/

// Global state ka type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch ka type
export type AppDispatch = typeof store.dispatch;
