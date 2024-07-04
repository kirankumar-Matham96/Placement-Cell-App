// imports
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { Buffer } from "buffer";

/**
 * To handle data download
 * @param {data to be downloaded} data
 * @param {response} res
 * @param {next middleware} next
 */
export const downloadCSVMiddleware = (data, res, next) => {
  try {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const dataObject = JSON.parse(data);
    const csv = generateCsv(csvConfig)(dataObject);

    // Create a buffer from the CSV string
    const buffer = Buffer.from(csv, "utf-8");

    // Encode the buffer to base64
    const base64Csv = buffer.toString("base64");

    res.status(200).json({
      success: true,
      data: {
        csv: base64Csv,
      },
    });
  } catch (err) {
    next(err);
  }
};
