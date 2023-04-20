import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tableData: []
}

const tabledataSlice = createSlice({
    name: "TableArray",
    initialState,
    reducers: {
        tableData: (state, action) => {
            state.tableData=(action.payload)
        },

    }


})
export default tabledataSlice.reducer
export const { tableData } = tabledataSlice.actions

