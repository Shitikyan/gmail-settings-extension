import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { State } from "./types.ts";

const initialState: State = {
  density: "Default",
  inbox: "Default",
  reading: "No Split",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        density: action.payload.density,
        reading: action.payload.reading,
        inbox: action.payload.inbox,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
