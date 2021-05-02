import { MonthsWord} from "../date/ConvertMonthWord";

export const SalesTable = [
    {
        name: "productCode",
        label: "Product Code"
    },
    {
        name: "productName",
        label: "Product Name",

    },
    {
        name: "price",
        label: "Price"
    },
    {
        name: "transaction",
        label: "Transaction Code",
    },

    {
        name: "date",
        label: "Date"
    },
];

export function InsertSales(productCode,productName,price,transaction, dateTime) {

    return {productCode,productName,price,transaction, date: MonthsWord(dateTime)}
}