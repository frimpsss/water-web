import { useState, useEffect } from "react";
import { dataFromFirebase } from "../utils/firebase"; // Adjust the import path as needed

interface Reading {
  timeStamp: number; // Epoch time in seconds
  value: number; // Consumption value
}

interface HourlyConsumption {
  hour: string; // "HH:00" format
  totalConsumption: number; // Total consumption for that hour
}

interface DailyConsumption {
  date: string; // "YYYY-MM-DD" format
  hourlyData: HourlyConsumption[]; // Array of hourly consumption data for that day
}

function groupReadingsByDayAndHour(readings: Reading[]): DailyConsumption[] {
  const groupedData: { [date: string]: { [hour: string]: number } } = {};

  readings.forEach((reading) => {
    const date = new Date(reading.timeStamp * 1000);
    const dateString = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const hourString = date.toISOString().slice(11, 13) + ":00"; // "HH:00"

    if (!groupedData[dateString]) {
      groupedData[dateString] = {};
    }

    if (!groupedData[dateString][hourString]) {
      groupedData[dateString][hourString] = 0;
    }

    groupedData[dateString][hourString] += Number(reading.value);
  });

  return Object.keys(groupedData).map((date) => ({
    date,
    hourlyData: Object.keys(groupedData[date]).map((hour) => ({
      hour,
      totalConsumption: groupedData[date][hour],
    })),
  }));
}

export function useMeterReadingsGroupedByDay() {
  const [groupedData, setGroupedData] = useState<DailyConsumption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data$rmFirebase = await dataFromFirebase();

        const allReadings: Reading[] = Object.keys(data$rmFirebase).flatMap(
          (key) => Object.values(data$rmFirebase[key])
        ) as Reading[];

        const groupedReadings = groupReadingsByDayAndHour(allReadings);
        setGroupedData(groupedReadings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs once

  return { groupedData, loading, error };
}
