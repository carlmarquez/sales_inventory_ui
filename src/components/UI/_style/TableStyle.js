import { makeStyles } from "@material-ui/styles"

const style = makeStyles(() => ({
    root: {
        width: '100%',
    },
    tableNavbar: {
        marginBottom: 10,

    },
    tableNavbarBox: {
        flex: 1
    },
    tableContainerWrapper: {
        width: '100%',
    },
    tableHead: {
        fontWeight: 'bold'
    },
}))


export default style;
// just override this function if you have a unique function
// in your table
export function TableOptions(loading) {

    return {
        filter: true,
        filterType: "dropdown",
        print:false,
        selectableRowsHeader: true,
        rowsPerPageOptions:[10,20,50,100],
        rowsPerPage:10,
        pagination: true,
        searchPlaceholder: 'Search Anything',
        selectableRowsHideCheckboxes: false,
        selectableRows:  'none',
        textLabels: {
            body: {
                noMatch: loading?"": "Sorry, no matching records found",
            },
        }
    };
}
