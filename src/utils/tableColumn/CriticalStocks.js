export const CriticalStockTable = [
    {
        name: "code",
        label: "Product Code"
    },
    {
        name: "name",
        label: "Product Name",

    },
    {
        name: "branch",
        label: "Branch",
    },

];

export function InsertCriticalStock(code,name,branch) {
    return {code,name,branch}
}