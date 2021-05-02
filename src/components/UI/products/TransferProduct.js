import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import {useEffect, useState, Fragment} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {productTransfer, storeList} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";

import StoreFind from "../store_branch/StoreFind";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 400,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const TransferProduct = (
    {
        data,
        closeDialog,
        dialog,
        transfer
    }) => {
    // For Transfer Dialog
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    const [tempLeft, setTempLeft] = useState([])
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    // for find the branch dialog
    const [findDialog, setFindDialog] = useState()
    const [toTransferBranch, setToTransferBranch] = useState()

    const [leftSearch, setLeftSearch] = useState('')

    const filterLeft = (value) => {
        setLeftSearch(value)
        if (value.length !== 0) {
            const newLeft = left.filter(e => e.productName.toLowerCase().startsWith(leftSearch.length === 0 ? '' : leftSearch.toLowerCase()))
            setTempLeft(newLeft)
            return
        }

        setTempLeft(left)


    }


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };


    const customList = (title, items, change) => (
        <Card>
            <p style={{margin: 0, marginLeft: 15, marginTop: 10}}><b>{title}</b></p>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    change === null ? null :
                        <TextField placeholder={'Search Product Name'} onChange={(e) => change(e.target.value)}/>
                    // <Checkbox
                    //     onClick={handleToggleAll(items)}
                    //     checked={numberOfChecked(items) === items.length &&   items.length !== 0}
                    //     indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                    //     disabled={items.length === 0}
                    //     inputProps={{ 'aria-label': 'all items selected' }}
                    // />
                }
                // subheader={`${numberOfChecked(items)}/${it/**/ems.length} selected`}
            />
            <Divider/>
            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.productName} - ${value.code}`}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Card>
    );


    // for autocomplete
    const [stores, setStores] = useState([])

    const [qty, setQty] = useState(1)
    const [code, setCode] = useState('')
    const [store, setStore] = useState(null)


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const register = (event) => {
        event.preventDefault()

        if(right.length === 0) {
            alert('Container Is Empty')
            return
        }
    }

    useEffect(() => {
        setLeft(data)
        setTempLeft(data)
        setFindDialog(dialog)
    }, [dialog])
    return <Fragment>
        {
            findDialog ===true ? <StoreFind  updateClose={closeDialog}
                                             closeDialog={() => setFindDialog(false)}
                                             dialog={findDialog}
                                             setStore={setToTransferBranch}/>
                :
                <Dialog
                    open={dialog}
                    onClose={closeDialog}
                    aria-labelledby="add-student"
                    maxWidth={"lg"}
                    fullWidth
                >

                    <DialogTitle style={{color: 'black', backgroundColor: '#DEDEDE'}}><b>Transfer Product To Branch</b></DialogTitle>
                    <DialogContent style={{backgroundColor: '#DEDEDE'}}>
                        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                            <Grid item>{customList('Select Product', tempLeft, filterLeft)}</Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        size="small"
                                        className={classes.button}
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                        color='primary'
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        disableElevation
                                        variant="contained"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                        color={'primary'}
                                    >
                                        &lt;
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>{customList(`Product To Be Transferred To Branch ${toTransferBranch === undefined?'': toTransferBranch.location}`, right, null)}</Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{backgroundColor: '#DEDEDE'}}>

                        <Button type={"submit"} variant={'contained'} color='primary' onClick={register}>
                            Transfer
                        </Button>
                        <Button onClick={closeDialog} variant={'contained'} color='secondary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
        }
    </Fragment>
}


export default TransferProduct