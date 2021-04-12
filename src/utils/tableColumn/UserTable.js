
export const UserTable = [
    {
        name: "email",
        label: "Email",
    },
    {
        name: "firstName",
        label: "First Name",

    },
    {
        name: "lastName",
        label: "Last Name",
    },
    {
        name: "role",
        label: "Role"
    },
    {
        name: "store",
        label: "Store Name"
    },
    {
        name: 'status',
        label: 'Status'
    }
];

export function InsertUser(id,email,firstName, lastName,role,store,status) {
    return {email, firstName, lastName,role: role===1?'User': role===2?'Manager': 'Owner',store,status: status ===1?'Active':'InActive'}
}