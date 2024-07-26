import * as Y from "yup";
import { dataFromFirebase } from "./firebase";
import _ from "lodash";
export { default as cn } from "./classnames";
export { default as wrapClick } from "./wrap-click";
export { default as wrapOnchange } from "./wrap-onchange";
// export {default as useUrlState} from './use-url-state'
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}
export function formatDate(date: Date): string {
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export async function returnGroupedAndTotal() {
  try {
    const data$rmFirebase = await dataFromFirebase();
    const allReadings = Object.keys(data$rmFirebase).map((e) => {
      return data$rmFirebase[e];
    });

    let total = 0;
    let flattened = [];
    allReadings.forEach((e) => {
      const j = Object.values(e);
      j.forEach((m: any) => {
        flattened.push(m);
        total += Number(m?.value);
      });
    });

    console.log(flattened);

    const flattened_sorted = _.groupBy(flattened, (obj) =>
      new Date(obj?.timeStamp * 1000).toDateString().split("T")
    );

    console.log("total: ", flattened_sorted);
  } catch (error) {
    console.log(error);
  }
}
