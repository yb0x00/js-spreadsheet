import { GridRenderer } from "./GridRenderer.js";
import { DataModel } from "./DataModel.js";
import { EventHandler } from "./EventHandler.js";
import { Exporter } from "./Exporter.js";

export class SpreadsheetApp {
  constructor(appContainerElement) {
    this.appContainer = appContainerElement;
    this.numRows = 9;
    this.numCols = 9;

    this.dataModel = new DataModel(this.numRows, this.numCols);
    this.gridRenderer = new GridRenderer(
      this.appContainer,
      this.numRows,
      this.numCols
    );
    this.eventHandler = new EventHandler(this.appContainer, this.dataModel);
    this.exporter = new Exporter(this.dataModel);

    this.eventHandler.onCellSelected = this.gridRenderer.highlightCell.bind(
      this.gridRenderer
    );
    this.eventHandler.onCellEditStart = this.gridRenderer.enterEditMode.bind(
      this.gridRenderer
    );
    this.eventHandler.onCellEditEnd = this.gridRenderer.exitEditMode.bind(
      this.gridRenderer
    );
    this.eventHandler.onDataUpdate = this.dataModel.updateCell.bind(
      this.dataModel
    );
    this.eventHandler.onExport = this.exporter.exportAsCsv.bind(this.exporter);
  }

  init() {
    this.gridRenderer.renderGrid();
    this.eventHandler.attachEvents();
  }
}
