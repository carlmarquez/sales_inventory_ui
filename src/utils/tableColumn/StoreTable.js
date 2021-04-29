export const StoreTable = [
    {
        name: "code",
        label: "Code"
    },
    {
        name: "location",
        label: "Location",

    },
    {
        name: 'email',
        label: 'Email'
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

export function InsertStore(code, location,email, postalCode,mobile_no,telno) {
    return {code,location,email,postalCode,mobile_no,telno}
}