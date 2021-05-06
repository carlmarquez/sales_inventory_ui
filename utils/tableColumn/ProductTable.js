export const ProductTable = [
    {
      name:"code",
      label: "Product Code"
    },
    {
        name: "brand",
        label: "Brand"
    },
    {
        name: "productName",
        label: "Product Name",

    },
    {
        name: "type",
        label: "Type",
    },
    {
        name: "amount",
        label: "Amount",
    },
    {
        name: "supplier",
        label: "Supplier Name"
    },
    {
        name: "store",
        label: "Branch Name"
    },
    {
        name: "status",
        label: "Status"
    }
];

export function InsertProduct(code,brand,productName,type, amount, supplier, store,status,id) {
    return {code,brand,productName,type, amount, supplier, store,status,id}
}