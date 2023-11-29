import { store } from "./redux";
import { State } from "./types.ts";

// Initial data
const initialState: State = {
  density: "Default",
  inbox: "Default",
  reading: "No Split",
};

chrome.runtime.onMessage.addListener((request, _sender: any, sendResponse) => {
  if (request.action === "FETCH_DATA") {
    // Get previous saved data
    chrome.storage.local.get("data", function (result) {
      // if first time running return default state
      if (Object.keys(result).length === 0) {
        sendResponse({ data: initialState });
      }
      // return previous saved state
      else {
        sendResponse({ data: result.data });
        store.dispatch({ type: "FETCH_DATA_SUCCESS", payload: result.data });
      }
    });
  }

  // saved new data
  else if (request.action === "SET_DATA") {
    chrome.storage.local.set({
      data: {
        density: request.data.density,
        inbox: request.data.inbox,
        reading: request.data.reading,
      },
    });
    store.dispatch({ type: "FETCH_DATA_SUCCESS", payload: request.data });
  }
  return true;
});
