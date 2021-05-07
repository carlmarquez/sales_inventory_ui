export const SupplierTable = [
    {
        name: "name",
        label: "Company Name"
    },
    {
        name: 'contactPerson',
        label: "Contact Person"
    },
    {
        name: "email",
        label: "Email",

    },
    {
        name: "address",
        label: "Company Address",
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

export function InsertSupplier(id, name,contactPerson,email, address,city, postalCode,mobile_no,telno) {
    return {id, name,contactPerson,email, address,city, postalCode,mobile_no,telno}
}