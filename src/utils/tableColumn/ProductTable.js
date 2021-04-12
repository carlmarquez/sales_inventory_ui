import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const ProductTable = [
    {
      name:"code",
      label: "Item Code"
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
        label: "Store Name"
    },
    {
        name: "status",
        label: "Status"
    }
];

export function InsertProduct(code,brand,productName,type, amount, supplier, store,status) {
    return {code,brand,productName,type, amount, supplier, store,status}
}