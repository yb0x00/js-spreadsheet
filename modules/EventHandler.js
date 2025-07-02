export class EventHandler {
  constructor(appContainer, dataModel) {
    this.appContainer = appContainer;
    this.dataModel = dataModel;

    this.onCellSelected = null;
    this.onCellEditStart = null;
    this.onCellEditEnd = null;
    this.onDataUpdate = null;
    this.onExport = null;

    this.selectedCellElement = null;
  }

  attachEvents() {
    this.appContainer.addEventListener("click", (event) => {
      const targetCell = event.target.closest(".cell");

      if (
        this.selectedCellElement &&
        this.selectedCellElement.classList.contains("editing")
      ) {
        if (this.selectedCellElement !== targetCell || !targetCell) {
          this._handleEditEnd(this.selectedCellElement);
        }
      }

      if (targetCell) {
        if (
          this.selectedCellElement !== targetCell ||
          !targetCell.classList.contains("editing")
        ) {
          if (this.selectedCellElement) {
            this.selectedCellElement.classList.remove("selected", "editing");
          }

          this.selectedCellElement = targetCell;
          this.selectedCellElement.classList.add("selected");

          if (this.onCellSelected) {
            this.onCellSelected(
              targetCell,
              targetCell.dataset.col,
              targetCell.dataset.row
            );
          }

          const initialValue = this.dataModel.getCell(targetCell.dataset.id);
          if (this.onCellEditStart) {
            this.onCellEditStart(targetCell, initialValue);
          }
        }
      } else {
        if (this.selectedCellElement) {
          this.selectedCellElement.classList.remove("selected", "editing");
          this.selectedCellElement = null;
          if (this.onCellSelected) {
            this.onCellSelected(null, null, null);
          }
        }
      }
    });

    document.addEventListener("keydown", (event) => {
      if (this.selectedCellElement) {
        if (this.selectedCellElement.classList.contains("editing")) {
          const input = this.selectedCellElement.querySelector(".cell-editor");
          if (!input) return;

          if (event.key === "Enter") {
            event.preventDefault();
            this._handleEditEnd(this.selectedCellElement, input.value);
          } else if (event.key === "Tab") {
            event.preventDefault();
            this._handleEditEnd(this.selectedCellElement, input.value);
          } else if (event.key === "Escape") {
            event.preventDefault();
            const originalValue = this.dataModel.getCell(
              this.selectedCellElement.dataset.id
            );
            this._handleEditEnd(this.selectedCellElement, originalValue);
          }
        } else {
          if (
            event.key.length === 1 ||
            event.key === "Space" ||
            (event.key >= "0" &&
              event.key <= "9" &&
              !event.ctrlKey &&
              !event.altKey &&
              !event.metaKey)
          ) {
            event.preventDefault();
            const initialValue = event.key === "Space" ? " " : event.key;
            if (this.onCellEditStart) {
              this.onCellEditStart(this.selectedCellElement, initialValue);
            }
          }
        }
      }
    });

    const exportBtn = this.appContainer.querySelector("#exportBtn");
    exportBtn.addEventListener("click", () => {
      if (
        this.selectedCellElement &&
        this.selectedCellElement.classList.contains("editing")
      ) {
        this._handleEditEnd(this.selectedCellElement);
      }

      if (this.onExport) {
        this.onExport();
      }
    });
  }

  _handleEditEnd(cellElement, newValue = null) {
    const input = cellElement.querySelector(".cell-editor");
    let finalValue;

    if (input) {
      finalValue = newValue !== null ? newValue : input.value;
      const cellId = cellElement.dataset.id;

      if (this.onDataUpdate) {
        this.onDataUpdate(cellId, finalValue);
      }

      if (this.onCellEditEnd) {
        this.onCellEditEnd(cellElement, finalValue);
      }
    } else {
      finalValue = cellElement.textContent;
      if (this.onCellEditEnd) {
        this.onCellEditEnd(cellElement, finalValue);
      }
    }
  }
}
