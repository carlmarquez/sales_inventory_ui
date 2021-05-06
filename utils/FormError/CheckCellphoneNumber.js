const pattern = new RegExp( /^(09|\+639)\d{9}$/);


const checkCellPhoneNumber = (value,setError,setMessage,message) => {
    if(!pattern.test(value)){
        setMessage(message)
        setError(true)
        return false
    }

    return  true
}

export default  checkCellPhoneNumber
