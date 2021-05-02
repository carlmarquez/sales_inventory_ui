import {MonthsWord} from "../date/ConvertMonthWord";

export const ProductTransfer = [
    {
        name: "transferCode",
        label: "Transfer Code"
    },
    {
        name: "From",
        label: "From"
    },
    {
        name: "to",
        label: "To",

    },
    {
        name: "user",
        label: "Arrange By",
    },


    {
        name: "date",
        label: "Date"

    },

];

export function InsertProductTransfer(transferCode,From,to,user, dateTime) {


    return {transferCode,From,to,user,date:MonthsWord(dateTime)}
}