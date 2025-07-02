export class Exporter {
  constructor(dataModel) {
    this.dataModel = dataModel;
  }

  async exportAsCsv() {
    const allData = this.dataModel.getAllData();
    const csvRows = [];

    allData.forEach((row) => {
      const escapedRow = row.map((cell) => {
        let escapedCell = String(cell).replace(/"/g, '""');
        if (
          escapedCell.includes(",") ||
          escapedCell.includes('"') ||
          escapedCell.includes("\n")
        ) {
          escapedCell = `"${escapedCell}"`;
        }
        return escapedCell;
      });
      csvRows.push(escapedRow.join(","));
    });

    const csvString = "\uFEFF" + csvRows.join("\n");

    // Chromium 기반에서만 동작할 수 있음
    if ("showSaveFilePicker" in window) {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: "spreadsheet.csv",
          types: [
            {
              description: "CSV files",
              accept: { "text/csv": [".csv"] },
            },
          ],
        });

        const writable = await fileHandle.createWritable();
        await writable.write(csvString);
        await writable.close();
        alert("파일이 성공적으로 저장되었습니다!");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("파일 저장 중 오류 발생:", error);
          alert("파일 저장에 실패했습니다.");
        }
      }
    } else {
      this._downloadFile(
        csvString,
        "spreadsheet.csv",
        "text/csv;charset=utf-8;"
      );
    }
  }

  _downloadFile(data, filename, type) {
    const blob = new Blob([data], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
