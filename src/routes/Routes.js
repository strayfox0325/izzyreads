import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Home from "../components/frontend/Home";
import Genre from "../components/admin/Genre";
import Title from "../components/admin/Title";

const Routes = [
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    { path: '/admin/add-genre', exact: true, name: 'Genre', component: Genre},
    { path: '/admin/title', exact: true, name: 'Title', component: Title},

    { path: '/', exact: true, name: 'Home', component: Home},
];

export default Routes;
