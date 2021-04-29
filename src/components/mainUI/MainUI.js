import {Suspense, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import style from './MainUiStyle'
import Sidebar from './sidebar/Sidebar';
import {Switch} from 'react-router';
import Skeleton from '../../utils/skeleton/TableUISkeleton'
import Navbar from "../navbar/Navbar";
import {Route} from "react-router-dom";

// ui for each entity
import {Products} from "../UI/products";
import {StoreBranch} from "../UI/store_branch";
import {Supplier} from "../UI/supplier";
import {Transaction} from "../UI/transaction";
import {Users} from '../UI/users'
import {Sales} from "../UI/sales";
import {Customers} from "../UI/customer/CustomerTable";
import DashBoard from "../UI/DashBoard/DashBoard";
import AuditTrail from "../UI/AuditTrail/AuditTrail";
import Settings from "../UI/settings/Settings";

export default function MainUI({setPosOn,user,setUser}) {
    const classes = style();


    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {

        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Navbar setUser={setUser} name={user} open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Sidebar
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                setPosOn={setPosOn}
            />


            <main className={classes.content}>
                <div className={classes.toolbar}/>

                {
                    <Suspense fallback={<Skeleton/>}>
                        <Switch>
                            <Route exact path={'/'}>
                                <DashBoard/>
                            </Route>
                            <Route exact path={"/users"}>
                                <Users/>
                            </Route>
                            <Route path={"/products"}>
                                <Products/>
                            </Route>

                            <Route exact path={"/stores"}>
                                <StoreBranch/>
                            </Route>

                            <Route path={"/sales"}>
                                <Sales/>
                            </Route>

                            <Route exact path={"/transaction"}>
                                <Transaction/>
                            </Route>
                            <Route path={"/supplier"}>
                                <Supplier/>
                            </Route>
                            <Route path={"/customer"}>
                                <Customers/>
                            </Route>
                            <Route path={"/audit"}>
                                <AuditTrail/>
                            </Route>
                            <Route path={"/settings"}>
                                <Settings/>
                            </Route>

                        </Switch>
                    </Suspense>
                }

            </main>
        </div>
    );
}