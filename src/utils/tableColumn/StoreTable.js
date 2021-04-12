export const StoreTable = [
    {
        name: "name",
        label: "Store Name"
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
        label: "Postal Code"
    },
    {
        name: "mobile_no",
        label: "Mobile No"
    },
    {
        name: "telno",
        label: "TelNo"
    },
];

export function InsertStore(id, name,email, address,city,state, postalCode,mobile_no,telno) {
    return {id, name,email, address,city,state, postalCode,mobile_no,telno, update:id, delete: id}
}