export const SupplierTable = [
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
        name: "postalCode",
        label: "Postal code"
    },
    {
        name: "mobile_no",
        label: "Mobile Number"
    },
    {
        name: "telno",
        label: "Telephone Number"
    }
];

export function InsertSupplier(id, name,email, address,city, postalCode,mobile_no,telno) {
    return {id, name,email, address,city, postalCode,mobile_no,telno}
}