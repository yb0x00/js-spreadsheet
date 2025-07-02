import { SpreadsheetApp } from "./modules/SpreadsheetApp.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.querySelector(".app-container");
  const spreadsheetApp = new SpreadsheetApp(appContainer);
  spreadsheetApp.init();
});
