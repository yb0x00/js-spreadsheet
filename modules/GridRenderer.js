export class GridRenderer {
  constructor(appContainer, numRows, numCols) {
    this.appContainer = appContainer;
    this.numRows = numRows;
    this.numCols = numCols;
    this.cellsContainer = appContainer.querySelector("#cellsContainer");
    this.columnHeadersContainer = appContainer.querySelector(".column-headers");
    this.rowHeadersContainer = appContainer.querySelector(".row-headers");
    this.currentCellAddressLabel = appContainer.querySelector(
      "#currentCellAddress"
    );

    this.selectedCellElement = null;
    this.selectedColHeaderElement = null;
    this.selectedRowHeaderElement = null;
  }

  renderGrid() {
    this.columnHeadersContainer.innerHTML = "";
    const emptyCorner = document.createElement("div");
    emptyCorner.classList.add("header-cell", "corner");
    this.columnHeadersContainer.appendChild(emptyCorner);
    for (let i = 0; i < this.numCols; i++) {
      const colLetter = String.fromCharCode(65 + i);
      const header = document.createElement("div");
      header.classList.add("header-cell", "column-header");
      header.dataset.col = colLetter;
      header.textContent = colLetter;
      this.columnHeadersContainer.appendChild(header);
    }

    this.cellsContainer.innerHTML = "";
    this.rowHeadersContainer.innerHTML = "";

    this.columnHeadersContainer.style.gridTemplateColumns = `auto repeat(${this.numCols}, 1fr)`;
    this.cellsContainer.style.gridTemplateColumns = `repeat(${this.numCols}, 1fr)`;
    this.cellsContainer.style.gridTemplateRows = `repeat(${this.numRows}, 1fr)`;
    this.rowHeadersContainer.style.gridTemplateRows = `repeat(${this.numRows}, 1fr)`;

    for (let row = 1; row <= this.numRows; row++) {
      const rowHeader = document.createElement("div");
      rowHeader.classList.add("header-cell", "row-header");
      rowHeader.dataset.row = row;
      rowHeader.textContent = row;
      this.rowHeadersContainer.appendChild(rowHeader);

      for (let col = 0; col < this.numCols; col++) {
        const colLetter = String.fromCharCode(65 + col);
        const cellId = `${colLetter}${row}`;
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.id = cellId;
        cellDiv.dataset.row = row;
        cellDiv.dataset.col = colLetter;
        cellDiv.textContent = "";
        cellDiv.tabIndex = 0;

        this.cellsContainer.appendChild(cellDiv);
      }
    }
  }

  highlightCell(cellElement, colLetter, rowNum) {
    if (this.selectedCellElement) {
      this.selectedCellElement.classList.remove("selected");
    }
    if (this.selectedColHeaderElement) {
      this.selectedColHeaderElement.classList.remove("active");
    }
    if (this.selectedRowHeaderElement) {
      this.selectedRowHeaderElement.classList.remove("active");
    }

    cellElement.classList.add("selected");
    this.selectedCellElement = cellElement;

    this.currentCellAddressLabel.textContent = cellElement.dataset.id;

    this.selectedColHeaderElement = this.columnHeadersContainer.querySelector(
      `[data-col="${colLetter}"]`
    );
    this.selectedRowHeaderElement = this.rowHeadersContainer.querySelector(
      `[data-row="${rowNum}"]`
    );
    if (this.selectedColHeaderElement) {
      this.selectedColHeaderElement.classList.add("active");
    }
    if (this.selectedRowHeaderElement) {
      this.selectedRowHeaderElement.classList.add("active");
    }
  }

  enterEditMode(cellElement, initialValue = "") {
    if (cellElement.classList.contains("editing")) {
      return;
    }

    cellElement.classList.add("editing");
    const existingText = cellElement.textContent;
    cellElement.textContent = "";

    const input = document.createElement("input");
    input.type = "text";
    input.value = initialValue || existingText;
    input.classList.add("cell-editor");

    cellElement.appendChild(input);
    input.focus();
    input.select();
  }

  exitEditMode(cellElement, newValue) {
    const input = cellElement.querySelector(".cell-editor");
    if (input) {
      cellElement.removeChild(input);
    }
    cellElement.textContent = newValue;
    cellElement.classList.remove("editing");
  }
}
