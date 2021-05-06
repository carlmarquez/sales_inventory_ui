import {useState, Fragment} from "react";
import BranchCode from "./BranchCode";
import UserEmail from "./UserEmail";
import NewPassword from "./NewPassword";
import {baseUrlNoAuth} from "../../utils/axios/BaseUrl";
import {resetPasswordUpdateUserPassword} from "../../utils/ServerEndPoint";
const ResetPassword = ({step,setStep}) => {

    const [branch,setBranch] = useState('')
    const [user,setUser] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const resetPassword =  async () => {
        const data = {
            id: user.id,
            password:userPassword
        }

        await baseUrlNoAuth.post(resetPasswordUpdateUserPassword,data).then(ignored=>{
            alert('Password Reset Success')
            setStep(0)

        }).catch(ignored => {
            alert("can't Update")
        })
    }

    return (
        <Fragment>

            {step === 1? <BranchCode setBranch={setBranch}  setStep={setStep}/>:null}
            {step === 2?<UserEmail  branch={branch} setUser={setUser} setStep={setStep} />:null}
            {step === 3? <NewPassword setStep={setStep} setUserPassword={setUserPassword} resetPassword={resetPassword}/>:null}

        </Fragment>
    )

}


export default ResetPassword