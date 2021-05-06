import {MonthsWord} from "../date/ConvertMonthWord";

export const TransactionTable = [
    {
        name: "transactionCode",
        label: "Transaction Code"
    },
    {
        name: "cashierAssign",
        label: "Cashier Assigned"
    },
    {
        name: "amount",
        label: "Amount",

    },
    {
        name: "discount",
        label: "Discount",
    },
    {
        name: "customer",
        label: "Customer Name",
    },
    {
        name: "store",
        label: "Branch Locatoin"
    },
    {
        name: "date",
        label: "Date"

    },

];

export function InsertTransaction(transactionCode,cashierAssign,amount,discount, customer,store,dateTime) {


    return {transactionCode,cashierAssign,amount,discount, customer,store,date:MonthsWord(dateTime)}
}