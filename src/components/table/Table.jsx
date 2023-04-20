import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./table.css"
import { tableData } from '../../base/reducer/tableReducer';
import { useDispatch, useSelector } from "react-redux"


function Table() {
    const Reduxdispatch = useDispatch();
    const ReduxTableData = useSelector((state) => state.tableDataReducer.tableData);
    function reducer(state, action) {
        switch (action.type) {
            case "Increment":
                return { pageNumber: state.pageNumber + 1 }
            case "Decrement":
                return { pageNumber: state.pageNumber - 1 }
        }
    }
    const [state, dispatch] = useReducer(reducer, { pageNumber: 1 })
    const [tableValues, setTableValues] = useState([]);
    const [searchTableValues, setSearchTableValues] = useState([]);
    const tableDataReducer = useSelector((state) => state);
    useEffect(() => {
        doCallAnApi()
    }, [])
    const doCallAnApi = async () => {
        const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber}&per_page=10`)
        setTableValues(result.data);
        setSearchTableValues(result.data);
        Reduxdispatch(tableData(result.data))

    }
    const doSearchTheData = async (e) => {
        const searchResp = await searchTableValues.filter((list) => {
            return list.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setTableValues(searchResp)
    }
    const doDecrement = async () => {
        dispatch({ type: "Decrement" })
        if (ReduxTableData.length / 10 >= state.pageNumber) {
            let minusedStatePageNumber = state.pageNumber - 2
            let arr = [...ReduxTableData]
            const splice = await arr.splice(minusedStatePageNumber * 10, 10)
            Reduxdispatch(tableData(arr))
            setTableValues(splice);
            setSearchTableValues(splice);
            if (minusedStatePageNumber == 0) {
                Reduxdispatch(tableData(splice))
            }
        }
        else {
            const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber - 1}&per_page=10`)
            setTableValues(result.data);
            setSearchTableValues(result.data);
        }
    }
    const doIncrement = async () => {
        dispatch({ type: "Increment" })
        const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber + 1}&per_page=10`)
        setTableValues(result.data);
        setSearchTableValues(result.data);
        if (ReduxTableData.length == 0) {
            Reduxdispatch(tableData(result.data))
        } else {
            let arr = [];
            ReduxTableData.forEach((list) => {
                arr.push(list)
            })
            result.data.forEach((list) => {
                arr.push(list)
            })
            Reduxdispatch(tableData(arr))
        }
    }
    return (
        <div>
            <h1>Table list from Api page {state.pageNumber} </h1>
            <input placeholder='search...' onChange={doSearchTheData} />
            <div className='table' >
                {tableValues.length == 0 ? <div><h3 className='noData' >No Data</h3></div> :
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
                            {tableValues.map((datas, index) => {
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