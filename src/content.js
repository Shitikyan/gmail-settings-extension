import {
  getGmailSettingsParentContainerSelector,
  getSettingsButtonSelector,
  getDensitySettingsSelector,
  getInboxTypeSettingsSelector,
  getReadingPaneSettingsSelector,
} from "./helpers";
import { style } from "./style";
import { popup } from "./popup";

// Injecting popup element
const gmailSettingPanel = document.querySelector(
  getGmailSettingsParentContainerSelector()
);

let popupParent = document.createElement("div");
popupParent.className = "main-popup";

let styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

popupParent.innerHTML = popup;
gmailSettingPanel?.append(popupParent);

// Injecting images
let img1 = chrome.runtime.getURL("Default.png");
document.querySelector(".density-icon").src = img1;

let img2 = chrome.runtime.getURL("Previewpaneoff.png");
document.querySelector(".reading-icon").src = img2;

let img3 = chrome.runtime.getURL("Unreadfirst.png");
document.querySelector(".inbox-icon").src = img3;

let img4 = chrome.runtime.getURL("toggle.png");
document.querySelector(".toggle-button").src = img4;

// setting data injecting helpers
function setDensityValue(value) {
  document.querySelector(".density-value").innerHTML = value;
}

function setInboxValue(value) {
  document.querySelector(".inbox-value").innerHTML = value;
}

function setReadingValue(value) {
  document.querySelector(".reading-value").innerHTML = value;
}

// get and set previously saved data
chrome.runtime.sendMessage({ action: "FETCH_DATA" }, (response) => {
  setDensityValue(response.data.density);
  setInboxValue(response.data.inbox);
  setReadingValue(response.data.reading);
});

// gmail setting button and popup toggle button
let button = document.querySelector(".popup--setting-button");
let popupControllButton = document.querySelector(".popup-toggle-icon");
let settingButton = document.querySelector(getSettingsButtonSelector());
let isSettingsOpened = false;
let popupOpened = true;

// toggel gmail setting panel
button.addEventListener("click", () => {
  let density = document.querySelectorAll(getDensitySettingsSelector());
  let inbox = document.querySelectorAll(getInboxTypeSettingsSelector());
  let reading = document.querySelectorAll(getReadingPaneSettingsSelector());
  settingButton = document.querySelector(getSettingsButtonSelector());

  settingButton.click();
  isSettingsOpened = !isSettingsOpened;

  // inject settings data
  density.forEach((value) => {
    if (value.checked) {
      setDensityValue(value.ariaLabel);
      density = value.ariaLabel;
    }
  });

  inbox.forEach((value) => {
    if (value.checked) {
      setInboxValue(value.ariaLabel);
      inbox = value.ariaLabel;
    }
  });

  reading.forEach((value) => {
    if (value.checked) {
      setReadingValue(value.ariaLabel);
      reading = value.ariaLabel;
    }
  });

  // save data
  chrome.runtime.sendMessage(
    { action: "SET_DATA", data: { density, inbox, reading } },
    () => {}
  );

  if (isSettingsOpened) {
    button.innerHTML = "Close Settings";
  } else {
    button.innerHTML = "Open Settings";
  }
});

// open/close popup
popupControllButton.addEventListener("click", () => {
  popupOpened = !popupOpened;
  let popup = document.querySelector(".popup-main-body");
  button = document.querySelector(".popup--setting-button");

  if (popupOpened) {
    unfade(popup);
  } else {
    fade(popup);
  }
});

// Draging vertically logic
let mousePosition;
let offset = [0, 0];
let isDown = false;

popupParent.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = [
      popupParent.offsetLeft - e.clientX,
      popupParent.offsetTop - e.clientY,
    ];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      popupParent.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);

// Animation
function fade(element) {
  var op = 1;
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 2);
}

function unfade(element) {
  var op = 0.1;
  element.style.display = "block";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 12);
}
