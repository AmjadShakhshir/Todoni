import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosReducer from "./Reducers/todosReducer";
import usersReducer from "./Reducers/usersReducer";

const rootReducer = combineReducers({
    todosReducer,
    usersReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;