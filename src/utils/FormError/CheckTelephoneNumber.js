const pattern = new RegExp( /^[0-9]{8}$/);

const CheckTelephoneNumber = (telephone, setError,setMessage,message) => {

    if(!pattern.test(telephone)){
        setError(true)
        setMessage(message)
        return false
    }

    return true
}

export default CheckTelephoneNumber