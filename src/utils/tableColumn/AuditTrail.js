export const AuditTrailTable = [
    {
        name: "id",
        label: "ID"
    },
    {
        name: "name",
        label: "Name",

    },
    {
        name: "action",
        label: "Action",
    },
    {
        name: "branch",
        label: "Branch"
    },
    {
        name: "date",
        label: "Date",
    },
    {
        name: 'value',
        label: 'Value'
    }

];

export function InsertAudit(id, name,action,branch,date,value) {
    return {id, name, action,branch,date,value}
}