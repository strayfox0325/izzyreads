import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AddTitle() {

    const [genreList, setGenreList] = useState([]);
    const [cover, setCover] = useState([]);
    const [error, setError] = useState([]);

    const [titleInput, setTitle] = useState({
        genre_id: '',
        slug: '',
        name: '',
        author: '',
        summary: '',
        year: '',
        price: '',
        isbn: '',
        pages: '',
    });


    const handleInput = (e) => {
        e.persist();
        setTitle({...titleInput, [e.target.name]: e.target.value});
    }

    const handleCover = (e) => {
        e.persist();
        setCover({cover: e.target.files[0]});
    }
    useEffect(() => {
        axios.get(`/api/all-genres`).then(res => {
            if (res.data.status === 200) {
                setGenreList(res.data.genre);
            }
        });

    }, []);

    const submitTitle = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cover', cover.cover);
        formData.append('genre_id', titleInput.genre_id);
        formData.append('slug', titleInput.slug);
        formData.append('name', titleInput.name);
        formData.append('author', titleInput.author);
        formData.append('summary', titleInput.summary);
        formData.append('year', titleInput.year);
        formData.append('price', titleInput.price);
        formData.append('isbn', titleInput.isbn);
        formData.append('pages', titleInput.pages);

        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post(`/api/add-title`, formData).then(res => {
                if (res.data.status === 200) {
                    setTitle({...titleInput,
                        genre_id: '',
                        slug: '',
                        name: '',
                        author: '',
                        summary: '',
                        year: '',
                        price: '',
                        isbn: '',
                        pages: '',
                    });
                    setCover([]);
                    swal("Success", res.data.message, "success");
                    setError([]);
                } else if (res.data.status === 422) {
                    swal("All fields are mandatory!" ,"warning");
                    setError(res.data.errors);
                }
            });
        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Title
                        <Link to="/admin/view-title" className="btn btn-info float-end text-white">View
                            Title</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={submitTitle} id="title_form">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active btn-info" id="basic-tab" data-bs-toggle="tab"
                                        data-bs-target="#basic" type="button" role="tab" aria-controls="basic"
                                        aria-selected="true">Basic Details
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link btn-info" id="details-tab" data-bs-toggle="tab"
                                        data-bs-target="#details" type="button" role="tab" aria-controls="details"
                                        aria-selected="false">Additional Details
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="basic" role="tabpanel"
                                 aria-labelledby="basic-tab">
                                <div className="form-group mb-3">
                                    <label>Select Genre</label>
                                    <select name="genre_id" onChange={handleInput} value={titleInput.genre_id}
                                            className="form-control">
                                        <option>-- Select a genre --</option>
                                        {
                                            genreList.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className="text-danger">{error.genre_id}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={titleInput.slug}
                                           className="form-control"/>
                                    <span className="text-danger">{error.slug}</span>

                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={titleInput.name}
                                           className="form-control"/>
                                    <span className="text-danger">{error.name}</span>

                                </div>
                                <div className="form-group mb-3">
                                    <label>Author</label>
                                    <input type="text" name="author" onChange={handleInput} value={titleInput.author}
                                           className="form-control"/>
                                    <span className="text-danger">{error.author}</span>

                                </div>
                                <div className="form-group mb-3">
                                    <label>Summary</label>
                                    <textarea name="summary" onChange={handleInput} value={titleInput.summary}
                                              className="form-control"/>
                                    <span className="text-danger">{error.summary}</span>
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="details" role="tabpanel"
                                 aria-labelledby="details-tab">
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Year Published</label>
                                        <input type="number" name="year" onChange={handleInput} value={titleInput.year}
                                               className="form-control"/>
                                        <span className="text-danger">{error.year}</span>

                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Price</label>
                                        <input type="text" name="price" onChange={handleInput} value={titleInput.price}
                                               className="form-control"/>
                                        <span className="text-danger">{error.price}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>ISBN</label>
                                        <input type="number" name="isbn" onChange={handleInput} value={titleInput.isbn}
                                               className="form-control"/>
                                        <span className="text-danger">{error.isbn}</span>

                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Pages</label>
                                        <input type="number" name="pages" onChange={handleInput}
                                               value={titleInput.pages} className="form-control"/>
                                        <span className="text-danger">{error.pages}</span>

                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Cover</label>
                                        <input type="file" name="cover" onChange={handleCover} value={titleInput.cover}
                                               className="form-control"/>
                                        <span className="text-danger">{error.cover}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info px-4 mt-2 text-white">Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTitle;
