import Button from "@material-ui/core/Button";
import {serverEndpoint} from "../ServerEndPoint";

export const SupplierReceiptTable = [
    {
        name: 'code',
        label: 'Receipt Code'
    },
    {
        name: 'description',
        label: 'Description'
    },
    {
        name: "name",
        label: "Company Name"
    },
    {
        name: 'email',
        label: 'Email'
    },
    {
        name: 'contactPerson',
        label: 'Contact Person'
    },

    {
        name: "receipt",
        label: "Receipt",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return value === undefined ? null :
                    <a href={serverEndpoint + '/supplierReceipt/getImage/'+ value} target="_blank"
                       style={{textDecoration: 'none'}}>
                        <Button variant="outlined" color="primary">
                            View Receipt
                        </Button>
                    </a>
            },
            filterOptions: {
                fullWidth: false
            }
        }
    },
];


export function InsertSupplierReceipt(code,description, name,email, contactPerson,receipt) {
    return {code,description, name,email, contactPerson,receipt}
}