import type { TrainJourney } from "train-times";

function convertToTableData(journeys: TrainJourney[]) {
  return journeys.map((j) => {
    if (j.status === "cancelled") {
      return {
        Schedule: j.scheduleOriginDepartureTime,
        "Departure Status": "Cancelled",
      };
    }

    if (j.status === "delayed") {
      return {
        Schedule: j.scheduleOriginDepartureTime,
        "Departure Status": "Delayed",
      };
    }

    const journeyDuration = j.journeyDurationMinutes
      ? `${j.journeyDurationMinutes} minutes`
      : "";

    if (j.status === "on-time") {
      return {
        Schedule: j.scheduleOriginDepartureTime,
        "Departure Status": j.originDepartureTime,
        Platform: j.platform ?? "TBD",
        "Destination Arrival": j.destinationArrivalTime,
        "Journey Duration": journeyDuration,
      };
    }

    const departureStatus = j.originDepartureTime
      ? j.departureLateByMinutes
        ? `${j.originDepartureTime} (late by ${j.departureLateByMinutes} minutes)`
        : `${j.originDepartureTime} (late)`
      : "?";

    return {
      Schedule: j.scheduleOriginDepartureTime,
      "Departure Status": departureStatus,
      Platform: j.platform ?? "TBD",
      "Destination Arrival": j.destinationArrivalTime,
      "Journey Duration": journeyDuration,
    };
  });
}

export { convertToTableData };
