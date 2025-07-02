export class DataModel {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.data = new Map();
    this.initializeData();
  }

  initializeData() {
    for (let row = 1; row <= this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const colLetter = String.fromCharCode(65 + col);
        const cellId = `${colLetter}${row}`;
        this.data.set(cellId, "");
      }
    }
  }

  updateCell(cellId, value) {
    this.data.set(cellId, value);
  }

  getCell(cellId) {
    return this.data.get(cellId) || "";
  }

  getAllData() {
    const allData = [];
    for (let row = 1; row <= this.numRows; row++) {
      const rowData = [];
      for (let col = 0; col < this.numCols; col++) {
        const colLetter = String.fromCharCode(65 + col);
        const cellId = `${colLetter}${row}`;
        rowData.push(this.getCell(cellId));
      }
      allData.push(rowData);
    }
    return allData;
  }
}
