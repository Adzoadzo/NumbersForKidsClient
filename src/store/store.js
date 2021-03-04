import reducers from "../reducers/index";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";

const logger = createLogger({
	collapsed: true,
	colors: {
		title: () => "green"
	}
});

const middleware = applyMiddleware(promiseMiddleware, thunk, logger);

export default createStore(
	reducers,
	middleware
)