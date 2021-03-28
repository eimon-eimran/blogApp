const dialogReducer = (state = {dialogOpen : false}, action) => {
    switch (action.type) {
        case 'OPENDIALOG' : 
            return {dialogOpen : !state.dialogOpen}
        default : 
            return state    
    }
}

export default dialogReducer