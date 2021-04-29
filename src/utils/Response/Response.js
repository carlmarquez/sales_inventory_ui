import {Fragment} from "react";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";

const Response = (
    {
        showError,
        errorTitle,
        errorMessage,
        showSnackBar,
        successMessage,
        closeSnackBar
    }
) => {
    return <Fragment>
        {
            showError ?
                <Fragment>
                    <Alert variant="filled" severity="error">
                        <AlertTitle><strong>{errorTitle}</strong></AlertTitle>
                        <strong>{errorMessage}</strong>
                    </Alert>

                    <br/>
                </Fragment>
                : null

        }
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={showSnackBar} autoHideDuration={3000} onClose={closeSnackBar}>
            <Alert onClose={closeSnackBar} severity="success">
                {successMessage}
            </Alert>
        </Snackbar>
    </Fragment>
}

export default Response
