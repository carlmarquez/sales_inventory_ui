export const TransactionTable = [
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
        label: "Store Name"
    },
    {
        name: "date",
        label: "Date"

    },

];

export function InsertTransaction(id,cashierAssign,amount,discount, customer,store,date) {
    return {id,cashierAssign,amount,discount, customer,store,date}
}