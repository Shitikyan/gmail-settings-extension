export const style = `
.main-popup {
  position:absolute;
  right:0;
  z-index: 1000;
  display: flex;
}

.toogle-button-container {
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 3rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #e5ece9;
  z-index: 1000;
  text-align: center;
}

.popup-toggle-icon {
  text-align: center;
  border: none;
  background-color: #e5ece9;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 100%;
  width: 100%;
  margin-top: 5px;
}

.toggle-button {
  height: 20px;
  width: 20px;
}

.top-bar {
  background-color: #505762 !important;
  height: 1.5rem !important;
  width: 100% !important;
}

.popup-body {
  background-color: #e5ece9;
  display: flex !important;
  flex-direction: column !important;
  padding: 1rem 2rem;
}

.popup-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex !important;
  gap: 1rem !important;
  justify-content: center !important;
}

.info-container {
  padding: 1rem !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  background-color: white !important;
  border-radius: 5px !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}

.popup--setting-button {
  width: 100% !important;
  background-color: #4285f4 !important;
  border-radius: 5px !important;
  height: 3rem !important;
  color: black !important;
  text-align: center !important;
  border: none !important;
  font-weight: 600;
  font-size: 0.9rem !important;
}

.popup-setting-value {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.pop-up-info-text {
  font-size: 1.1rem !important;
  font-weight: 500 !important;
}

.popup-title-text {
  font-size: 0.8rem !important;
  font-weight: 600 !important;
}


  `;
