import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function EditGenre(props) {

    const history = useHistory();
    const [genreInput, setGenreInput] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);

    useEffect(() => {
        document.title = 'IzzyReads | Edit AddGenre';
        const genre_id = props.match.params.id;
        axios.get(`/api/edit-genre/${genre_id}`).then(res => {
            if (res.data.status === 200) {
                setGenreInput(res.data.genre);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-genre');
            }
            setLoading(false);
        });
    }, [history, props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setGenreInput({...genreInput, [e.target.name]: e.target.value});
    }

    const updateGenre = (e) => {
        e.preventDefault();

        const genre_id = props.match.params.id;
        axios.put(`/api/update-genre/${genre_id}`, genreInput).then(res => {
            if (res.data.status === 200) {
                swal("Successfully Updated", res.data.message, "success");
                setError([]);
                history.push('/admin/show-category');
            } else if (res.data.status === 422) {
                swal("All fields must be filled", "", "warning");
                setError(res.data.errors);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-genre');
            }
        });
    }

    if (loading) {
        return <h4>Loading genre...</h4>
    } else {
        return (
            <div className="container-fluid px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Edit Genre
                            <Link to="/admin/view-genre" className="btn btn-info text-white float-end">Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateGenre}>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active btn-info" id="home-tab" data-bs-toggle="tab"
                                            data-bs-target="#home"
                                            type="button" role="tab" aria-controls="home" aria-selected="true">Home
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link btn-info" id="seo-tags-tab" data-bs-toggle="tab"
                                            data-bs-target="#seo-tags"
                                            type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO
                                        Tags
                                    </button>
                                </li>
                            </ul>

                            {/*Tabs Content*/}
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className="form-group mb-3">
                                        <label>Slug</label>
                                        <input type="text" name="slug" onChange={handleInput} value={genreInput.slug}
                                               className="form-control"/>
                                        <span className="text-danger">{error.slug}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={genreInput.name}
                                               className="form-control"/>
                                        <span className="text-danger">{error.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <textarea name="description" onChange={handleInput}
                                                  value={genreInput.description || ''}
                                                  className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Show/Hide</label>
                                        <input type="checkbox" name="status" onChange={handleInput}
                                               value={genreInput.status}/>
                                    </div>
                                </div>
                                <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel"
                                     aria-labelledby="seo-tags-tab">
                                    <div className="form-group mb-3">
                                        <label>Meta Title</label>
                                        <input type="text" name="meta_title" onChange={handleInput}
                                               value={genreInput.meta_title}
                                               className="form-control"/>
                                        <span className="text-danger">{error.meta_title}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Keyword</label>
                                        <textarea name="meta_keyword" onChange={handleInput}
                                                  value={genreInput.meta_keyword || ''}
                                                  className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Description</label>
                                        <textarea name="meta_description" onChange={handleInput}
                                                  value={genreInput.meta_description || ''}
                                                  className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-info text-white px-4 float-end">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditGenre;