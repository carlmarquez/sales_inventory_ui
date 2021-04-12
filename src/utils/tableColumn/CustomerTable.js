export const CustomerTable = [
    {
        name: "name",
        label: "Name"
    },
    {
        name: "email",
        label: "Email",

    },
    {
        name: "address",
        label: "Address",
    },
    {
        name: "city",
        label: "City",
    },
    {
        name: "state",
        label: "State"
    },
    {
        name: "postalCode",
        label: "Postal code"
    },
    {
        name: "mobile_no",
        label: "Mobile No"
    },
    {
        name: "telno",
        label: "TelNo"
    }
];

export function InsertCustomer(id, name,email, address,city,state, postalCode,mobile_no,telno) {
    return {id, name,email, address,city,state, postalCode,mobile_no,telno}
}