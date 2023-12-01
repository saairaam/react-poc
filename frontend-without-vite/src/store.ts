import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice/auth.slice";

function saveToLocalStorage(store: any) {
  try {
    const serializedStore = JSON.stringify(store);
    console.log("serializedStore",serializedStore);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
const preloadedState = loadFromLocalStorage();
const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
