import React from "react";
import axios from 'axios';
import { redirect } from 'react-router-dom';
function addBook(e){
    const data=new URLSearchParams({
                'title': e.target[0].value,
                'author': e.target[1].value
            })
    axios.post("http://localhost:5000/home",data)
    .then(res=>{
        if(res.status===200){
           return redirect("/")
        }
    })
}

function compose() {
    return (
        <div className="col col-lg-4 col-sm-10 p-3 mx-auto">
            <form onSubmit={addBook}>
                <h2 className="text-center mb-4">Add Book</h2>
                <div className="mb-3">
                    <label className="form-label">Book Title</label>
                    <input type="text" className="form-control" id="InputTitle" name="title" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" id="InputAuthor" name="author" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default compose;