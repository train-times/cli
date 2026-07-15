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
    const journeys = await getJourneysData({
      apiKey: API_KEY,
      from: fromCrs,
      to: toCrs,
      numRows: 10,
      timeWindow: 120,
    });

    if (journeys.length === 0) {
      console.log(
        `No upcoming live trains matching from ${fromCrs} to ${toCrs} found.`,
      );
      return;
    }

    const tableData = convertToTableData(journeys);

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
