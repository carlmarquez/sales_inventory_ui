import { Fragment } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
export default function SkeletonTable() {
    return (
        <Fragment>
           <Skeleton variant="rect" animation="wave"  width={'100%'} height={118} style={{marginBottom: 20, marginTop: 20}}/>
           <Skeleton variant="rect" animation="wave"  width={'100%'} height={500} />
        </Fragment> 
    )
}