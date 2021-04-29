import {
    BrowserRouter as Router, Route,
    Redirect
} from "react-router-dom";
import Login from "./components/Login/Logins";
import {Switch} from 'react-router';
import {useEffect, Fragment, Suspense, useState, lazy} from 'react'
import {baseUrlNoAuth} from "./utils/axios/BaseUrl";
import {tokenData} from "./utils/ServerEndPoint";
import Skeleton from "@material-ui/lab/Skeleton";
import Receipt from "./components/POS/checkout/Receipt";
const MainUi = lazy(() => import(`./components/mainUI/MainUI`));
const Pos = lazy(() => import(`./components/POS/Pos`))


const App = () => {

    const [token, setToken] = useState(null)
    const [user, setUser] = useState()
    const [posOn, setPosOn] = useState(false)


    // localStorage.clear()

    useEffect(() => {
        const tokenLocal = localStorage.getItem('jars-token')
        if (tokenLocal) {
            setToken(tokenLocal)
            const getUser = async () =>
                await baseUrlNoAuth.post(tokenData, {token: tokenLocal}).then(e => {
                    setUser(e.data)
                })

            getUser().then(ignored => {
            })

        }
    }, [token])

    useEffect(() => {

        if (user && user.role === 1) {
            setPosOn(true)
        }

    }, [user])


    return (
        <Router>
            <Suspense fallback={<Skeleton variant={"rect"} animation="wave" style={{width: '100%', height: '70%'}}  />}>
                {
                    token === null ? <Login setUser={setUser}
                                            setToken={setToken}/> :
                        <Switch>

                            {
                                posOn === true ?
                                    <Route  path="/">
                                        <Pos  setPosOn={setPosOn} user={user}/>
                                    </Route>

                                    :
                                    <Fragment>
                                        <MainUi setPosOn={setPosOn} setUser={setUser} user={user}/>
                                    </Fragment>
                            }

                        </Switch>

                }
            </Suspense>

            <Redirect to={"/"}/>
        </Router>

    )

}


export default App;