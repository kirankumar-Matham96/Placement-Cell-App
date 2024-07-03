import { mkConfig, generateCsv, asString } from "export-to-csv";
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

export const downloadCSVMiddleware = (data) => {
  // mkConfig merges your options with the defaults
  // and returns WithDefaults<ConfigOptions>
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  // Parse the incoming JSON data string into an object
  const dataObject = JSON.parse(data);

  // Converts your Array<Object> to a CsvOutput string based on the configs
  const csv = generateCsv(csvConfig)(dataObject);

  // Define the filename for the CSV file based on config
  const filename = `${csvConfig.filename}.csv`;

  // Convert the CSV string to a buffer with proper encoding
  const csvBuffer = Buffer.from(csv, "utf-8");

  // Write the CSV file to disk
  writeFile(filename, csvBuffer, (err) => {
    if (err) throw err;
    console.log("File saved: ", filename);
  });
};
