import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function Table() {
    const [tableValues, setTableValues] = useState([])

    useEffect(() => {

        doCallAnApi()

    }, [])

    const doCallAnApi = async () => {
        const result = await axios.get("https://api.punkapi.com/v2/beers?page=100&per_page=10").then((resp) => {
            console.log(resp, "resp");
            setTableValues(resp.data);
        }).catch((err) => {
            console.log(err)
        })
        return result
    }



    return (

        <div>
            <h1>Table list from Api</h1>
            <input placeholder='search...' />
            <table class="table table-hover">
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
                            <tr>
                                <th scope="row">{datas.id}</th>
                                <td>{datas.name}</td>
                                <td>{datas.description}</td>
                                <td>{datas.first_brewed}</td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
            <button>Prev</button>
            <button>Next</button>

        </div>
    )
}

export default Table