import React from 'react';
import ReactDOM from 'react-dom';
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "./reducer/data/data.js";
import App from './components/app/app.jsx';
import reducer from "./reducer/index.js";
import {createAPI} from "./api.js";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

