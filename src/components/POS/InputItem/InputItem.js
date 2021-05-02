import {TextField} from "@material-ui/core";

const InputItem = ({classes, buy, code, setCode,qty,setQty}) => {

    return (
        <div className={classes.inputItem}>
            <TextField autoFocus
                style={{width: '100%', marginLeft: 10}} value={code} onKeyPress={e => buy(e)} onChange={(e) => setCode(e.target.value)}
                       placeholder="Barcode here" variant="outlined"
           />
            <TextField style={{width: '90px',backgroundColor:'white'}}
                       value={qty}
                       onKeyPress={e => buy(e)}
                       onChange={(e) =>setQty(e.target.value <0?1: e.target.value)}
                       placeholder="QTY" variant="outlined"/>
        </div>
    )
}

export default InputItem