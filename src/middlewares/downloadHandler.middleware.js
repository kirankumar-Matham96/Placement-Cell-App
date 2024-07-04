// import { mkConfig, generateCsv, asString } from "export-to-csv";
// import { mkConfig, generateCsv, asBlob } from "export-to-csv";

// export const downloadCSVMiddleware = (data, res, next) => {
//   try {
//     // mkConfig merges your options with the defaults
//     // and returns WithDefaults<ConfigOptions>
//     const csvConfig = mkConfig({ useKeysAsHeaders: true });

//     const dataObject = JSON.parse(data);

//     // Converts your Array<Object> to a CsvOutput string based on the configs
//     const csv = generateCsv(csvConfig)(dataObject);

//     // Generate the Blob from the CsvOutput
//     const blob = asBlob(csvConfig)(csv);

//     // Requires URL to be available (web workers or client scripts only)
//     const url = URL.createObjectURL(blob);

//     res.status(200).json({
//       success: true,
//       data: {
//         url,
//         csv,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

import { mkConfig, generateCsv, asString } from "export-to-csv";
import { Buffer } from "buffer";

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
