import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mainTableData: [],
    tableShowData:[],
    searchTableData:[]
}

const tabledataSlice = createSlice({
    name: "TableArray",
    initialState,
    reducers: {
        mainTableDataAction: (state, action) => {
            state.mainTableData=(action.payload)
        },
        tableShowAction:(state,action)=>{
            state.tableShowData=(action.payload)
        },
        searchTableDataAction:(state,action)=>{
            state.searchTableData=(action.payload)
        }
    }


})
export default tabledataSlice.reducer
export const { mainTableDataAction ,tableShowAction, searchTableDataAction } = tabledataSlice.actions

