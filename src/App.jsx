import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Compose from './compose'
import Head from './Head';
import axios from 'axios';


function deleteBook(e) {
    const id = e.target.value;
    const url = `http://localhost:5000/books/${id}`
    axios.delete(url).then(res => {
        if (res.status === 200) {
            console.log("Book Deleted");
        } else {
            console.log("Some Error Contact Developer");
        }
    })
}

function Card({ title, author, id }) {
    return (
        <div className="col-sm-3 mb-3 mx-sm-auto mb-sm-0">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text">{author} </p>
                    <button className="btn btn-danger" value={id} onClick={deleteBook}>Delete</button>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/home").then(result => result.data)
            .then(data => {
                setData(data)
            });
    })
    return (
        <div>
            <div>
                <Head />
            </div>
            <>
                    <Routes>
                        <Route exact path="/compose" element={<Compose />}/>
                        <Route exact path="/" element={
                            <div className="row">
                            {data.map((item, index) => (
                                <Card
                                    key={index}
                                    id={item._id}
                                    title={item.title}
                                    author={item.author}
                                />
                            ))}
                            </div>
                        }/>
                    </Routes>
            </>
        </div>

    );
}

export default App;