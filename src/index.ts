import { getJourneysData } from "train-times";

import { convertToTableData } from "./convert";

const API_KEY = process.env["API_KEY"];

async function displayLiveBoards(from: string, to: string) {
  const fromCrs = from.toUpperCase();
  const toCrs = to.toUpperCase();

  if (!API_KEY) {
    console.error("Missing API_KEY");
    process.exit(1);
  }

  try {
    const data = await getJourneysData({
      apiKey: API_KEY,
      from: fromCrs,
      to: toCrs,
      numRows: 10,
      timeWindow: 120,
    });

    if (!data.journeys?.length) {
      console.log(
        `No upcoming live trains matching from ${data.fromName} to ${data.toName} found.`,
      );
      return;
    }

    const tableData = convertToTableData(data.journeys);

    console.table(tableData, [
      "Schedule",
      "Departure Status",
      "Platform",
      "Destination Arrival",
      "Journey Duration",
    ]);
  } catch (error) {
    console.error("Execution failure running SDK board:", error);
  }
}

await displayLiveBoards("BSK", "WIN");
