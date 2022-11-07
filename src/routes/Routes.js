import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Home from "../components/frontend/Home";
import AddGenre from "../components/admin/genre/AddGenre";
import AddTitle from "../components/admin/title/AddTitle";
import ViewGenre from "../components/admin/genre/ViewGenre"
import EditGenre from "../components/admin/genre/EditGenre";
import DeleteGenre from "../components/admin/genre/DeleteGenre";

const Routes = [
    { path: '/', exact: true, name: 'Home', component: Home},
    // Admin
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    // Admin AddGenre
    { path: '/admin/add-genre', exact: true, name: 'AddGenre', component: AddGenre},
    { path: '/admin/view-genre', exact: true, name: 'ViewGenre', component: ViewGenre},
    { path: '/admin/edit-genre/:id', exact: true, name: 'EditGenre', component: EditGenre},
    { path: '/admin/delete-genre/:id', exact: true, name: 'DeleteGenre', component: DeleteGenre},
    // Admin AddTitle
    { path: '/admin/add-title', exact: true, name: 'AddTitle', component: AddTitle},

];

export default Routes;
