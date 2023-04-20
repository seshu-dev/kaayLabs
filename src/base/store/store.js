import { configureStore } from "@reduxjs/toolkit"
import tableDataReducer from "../reducer/tableReducer"

const store = configureStore({
    reducer: {
        tableDataReducer:tableDataReducer
    }
})
export default store

