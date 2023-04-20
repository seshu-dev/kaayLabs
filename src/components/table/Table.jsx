import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./table.css"
import { mainTableDataAction, searchTableDataAction, tableShowAction } from '../../base/reducer/tableReducer';
import { useDispatch, useSelector } from "react-redux"


function Table() {
    const Reduxdispatch = useDispatch();
    const { mainTableData, tableShowData, searchTableData } = useSelector((state) => state.tableDataReducer);
    function reducer(state, action) {
        switch (action.type) {
            case "Increment":
                return { pageNumber: state.pageNumber + 1 }
            case "Decrement":
                return { pageNumber: state.pageNumber - 1 }
            default:
                return { pageNumber: state.pageNumber }

        }
    }
    const [state, dispatch] = useReducer(reducer, { pageNumber: 1 })
    useEffect(() => {
        doCallAnApi()
    }, [])
    const doCallAnApi = async () => {
        const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber}&per_page=10`)
        Reduxdispatch(tableShowAction(result.data))
        Reduxdispatch(searchTableDataAction(result.data))
        Reduxdispatch(mainTableDataAction(result.data))

    }
    const doSearchTheData = async (e) => {
        const searchResp = await searchTableData.filter((list) => {
            return list.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        Reduxdispatch(tableShowAction(searchResp))
    }
    const doDecrement = async () => {
        dispatch({ type: "Decrement" })
        if (mainTableData.length / 10 >= state.pageNumber) {
            let minusedStatePageNumber = state.pageNumber - 2
            let arr = [...mainTableData]
            const splice = await arr.splice(minusedStatePageNumber * 10, 10)
            Reduxdispatch(mainTableDataAction(arr))
            Reduxdispatch(tableShowAction(splice))
            Reduxdispatch(searchTableDataAction(splice))
            if (minusedStatePageNumber == 0) {
                Reduxdispatch(mainTableDataAction(splice))
            }
        }
        else {
            const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber - 1}&per_page=10`)
            Reduxdispatch(tableShowAction(result.data))
            Reduxdispatch(searchTableDataAction(result.data))
        }
    }
    const doIncrement = async () => {
        dispatch({ type: "Increment" })
        const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber + 1}&per_page=10`)
        Reduxdispatch(tableShowAction(result.data))
        Reduxdispatch(searchTableDataAction(result.data))
        if (mainTableData.length == 0) {
            Reduxdispatch(mainTableDataAction(result.data))
        } else {
            let arr = [];
            mainTableData.forEach((list) => {
                arr.push(list)
            })
            result.data.forEach((list) => {
                arr.push(list)
            })
            Reduxdispatch(mainTableDataAction(arr))
        }
    }
    return (
        <div>
            <h1>Table list from Api page {state.pageNumber} </h1>
            <input placeholder='search...' onChange={doSearchTheData} />
            <div className='table' >
                {tableShowData.length == 0 ? <div><h3 className='noData' >No Data</h3></div> :
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">First Brewed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableShowData.map((datas, index) => {
                                return (
                                    <tr key={index} >
                                        <th scope="row">{datas.id}</th>
                                        <td>{datas.name}</td>
                                        <td>{datas.description}</td>
                                        <td>{datas.first_brewed}</td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>}
            </div>
            <div className='button' >
                <button className='button1' disabled={state.pageNumber == 1} onClick={doDecrement} >Previous</button>
                <button className='button2' disabled={state.pageNumber == 33} onClick={doIncrement} >Next</button>

            </div>

        </div>
    )
}

export default Table