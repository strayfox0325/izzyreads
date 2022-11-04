import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Home from "../components/frontend/Home";
import Genre from "../components/admin/genre/Genre";
import Title from "../components/admin/title/Title";
import ViewGenre from "../components/admin/genre/ViewGenre"
import EditGenre from "../components/admin/genre/EditGenre";
import DeleteGenre from "../components/admin/genre/DeleteGenre";

const Routes = [
    // Admin
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    // Admin Genre
    { path: '/admin/add-genre', exact: true, name: 'Genre', component: Genre},
    { path: '/admin/view-genre', exact: true, name: 'ViewGenre', component: ViewGenre},
    { path: '/admin/edit-genre/:id', exact: true, name: 'EditGenre', component: EditGenre},
    { path: '/admin/delete-genre/:id', exact: true, name: 'DeleteGenre', component: DeleteGenre},
    // Admin Title
    { path: '/admin/title', exact: true, name: 'Title', component: Title},

    { path: '/', exact: true, name: 'Home', component: Home},
];

export default Routes;
