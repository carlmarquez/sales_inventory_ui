
export const SalesTable = [
    {
        name: "productName",
        label: "Product Name",

    },
    {
        name: "price",
        label: "Price"
    },
    {
        name: "qty",
        label: "QTY",
    },
    {
        name: "total",
        label: "Total"
    },
    {
        name: "transaction",
        label: "Transaction ID",
    },

    {
        name: "date",
        label: "Date"
    },
];

export function InsertSales(id,productName,price,qty,total,transaction, date) {
    return {productName,price,qty,total,transaction, date}
}