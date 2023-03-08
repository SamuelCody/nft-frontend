import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const LoggerMiddleware = createLogger();

const middleware = [ThunkMiddleware];

if (process.env.REACT_APP_NODE_ENV === "development") {
  middleware.push(LoggerMiddleware);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middleware],
});

export default store;
