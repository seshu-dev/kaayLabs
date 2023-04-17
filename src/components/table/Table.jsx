import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./table.css"

function reducer(state, action) {
    switch (action.type) {
        case "Increment":
            return { pageNumber: state.pageNumber + 1 }
        case "Decrement":
            return { pageNumber: state.pageNumber - 1 }
    }
}

function Table() {
    const [state, dispatch] = useReducer(reducer, { pageNumber: 1 })
    const [tableValues, setTableValues] = useState([]);
    const [searchTableValues, setSearchTableValues] = useState([])
 

    useEffect(() => {

        doCallAnApi()

    }, [state.pageNumber])

    const doCallAnApi = async () => {
        const result = await axios.get(`https://api.punkapi.com/v2/beers?page=${state.pageNumber}&per_page=10`)
        setTableValues(result.data);
        setSearchTableValues(result.data)
    }

    const doSearchTheData = async (e) => {
        const searchResp = await searchTableValues.filter((list) => {
            return list.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setTableValues(searchResp)

    }

    return (

        <div>
            <h1>Table list from Api page {state.pageNumber} </h1>
            <input placeholder='search...' onChange={doSearchTheData} />
            <div className='table' >
                {tableValues.length==0 ? <div><h3 className='noData' >No Data</h3></div> :
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
           <button className='button1' disabled={state.pageNumber==1} onClick={() => dispatch({ type: "Decrement" })} >Previous</button>
            <button className='button2' onClick={() => dispatch({ type: "Increment" })} >Next</button>

           </div>
          
        </div>
    )
}

export default Table