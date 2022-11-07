import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import {useHistory} from "react-router-dom";

function AddGenre() {

    const history = useHistory();

    const [genreInput, setGenre] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.preventDefault();
        setGenre({...genreInput, [e.target.name]: e.target.value})
    }

    const submitGenre = (e) => {
        e.preventDefault();
        const data = {
            slug: genreInput.slug,
            name: genreInput.name,
            description: genreInput.description,
            status: genreInput.status,
            meta_title: genreInput.meta_title,
            meta_keyword: genreInput.meta_keyword,
            meta_description: genreInput.meta_description,
        }

        axios.post(`/api/add-genre`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", "AddGenre Added Successfully", "success");
                history.push("/admin/dashboard");
            } else if (res.data.status === 400) {
                setGenre({...genreInput, error_list: res.data.errors});
            }
        });
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add Genre</h1>
            <form onSubmit={submitGenre} id="genre_form">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active btn-info" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">Home
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link btn-info" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags"
                                type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags
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
                            <span>{genreInput.error_list.slug}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={genreInput.name}
                                   className="form-control"/>
                            <span>{genreInput.error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={genreInput.description}
                                      className="form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Show/Hide</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={genreInput.status}/>
                        </div>
                    </div>
                    <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel"
                         aria-labelledby="seo-tags-tab">
                        <div className="form-group mb-3">
                            <label>Meta Title</label>
                            <input type="text" name="meta_title" onChange={handleInput} value={genreInput.meta_title}
                                   className="form-control"/>
                            <span>{genreInput.error_list.meta_title}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Meta Keyword</label>
                            <textarea name="meta_keyword" onChange={handleInput} value={genreInput.meta_keyword}
                                      className="form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <textarea name="meta_description" onChange={handleInput} value={genreInput.meta_description}
                                      className="form-control"/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-info text-white px-4 float-end">Submit</button>
            </form>
        </div>
    );
}

export default AddGenre;
