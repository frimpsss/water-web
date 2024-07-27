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
export const monthNames: string[] = [
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
export function formatDate(date: Date): string {
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

export function getMonthAndYear(dateTimeStr: string) {
  const date = new Date(dateTimeStr);

  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    month,
    year,
  };
}
export const getTotalAmountPaid = (
  transactions: any[]
): {
  totalAmountPaidToday: number;
  totalAmountPaidThisWeek: number;
  totalAmountPaidThisMonth: number;
  totalAmountPaidOverall: number;
} => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let totalAmountPaidToday = 0;
  let totalAmountPaidThisWeek = 0;
  let totalAmountPaidThisMonth = 0;
  let totalAmountPaidOverall = 0;

  transactions?.forEach((transaction) => {
    const paymentDate = new Date(transaction?.createdAt);
    const amountPaid = transaction?.billId?.totalAmountDue;

    totalAmountPaidOverall += amountPaid;

    if (paymentDate >= startOfMonth) {
      totalAmountPaidThisMonth += amountPaid;
    }

    if (paymentDate >= startOfWeek) {
      totalAmountPaidThisWeek += amountPaid;
    }

    if (paymentDate >= startOfToday) {
      totalAmountPaidToday += amountPaid;
    }
  });

  return {
    totalAmountPaidToday,
    totalAmountPaidThisWeek,
    totalAmountPaidThisMonth,
    totalAmountPaidOverall,
  };
};
