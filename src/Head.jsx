import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function searchBook(e){
    e.preventDefault();
    const searchDrop=document.getElementById("search-dropdown");
    console.log(e.target[0].value);
    const query=e.target[0].value;
    axios.get(`http://localhost:5000/books/${query}`)
.then(res=>{
    if(res.status===200)
        return res.data;
    else{
        throw new Error('Book Not Found');
    }
})
    .then(Book=>{
        console.log(Book);
        searchDrop.classList.add('show');
        searchDrop.innerHTML="";
        if(Book.length===0){
            searchDrop.innerHTML=`<li className='dropdown-item text-center'><h5 className="card-title p-2">No Result Found</h5></li>`
        }else{
            //console.log(Book.length);
                Book.forEach(book =>{
                    searchDrop.innerHTML+=`<li className='dropdown-item text-center'><h5 className="card-title">${book.title} </h5>
        <p className="card-text">${book.author} </p></li>`
                })
            }

    })
    .catch(err=>{console.log(err);})

}


function Head(){
    return (
        <header className="py-3 mb-3 border-bottom">
    <div className="container-fluid d-grid gap-3 align-items-center" style={{"grid-template-columns": "1fr 2fr"}}>
      <div className="dropdown">
        <Link to="/" className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-book px-2"></i>
        </Link>
        <ul className="dropdown-menu text-small shadow">
        <Link className="dropdown-item" to="/" aria-current="page">Home</Link>
        <Link className="dropdown-item" to="/compose" aria-current="page">Add New Book</Link>
        </ul>
      </div>

      <div className="d-flex align-items-center">
        <form className="w-100 me-2" id="searchForm" onSubmit={searchBook}>
          <input type="search" className="form-control" placeholder="Search..." aria-label="Search" id="searchBar"/>
          <div className='dropdown'>
          <ul className="dropdown-menu text-small shadow" id='search-dropdown'>
            </ul>
          </div>
        </form>
        <button data-bs-toggle="dropdown" className='btn-close me-2'></button>
        <button className="btn btn-outline-success" type="submit" form="searchForm"><i className="bi bi-search"></i></button>
      </div>
    </div>
  </header>
    );
}


export default Head;