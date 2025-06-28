import { Routes, Route } from "react-router";
import { Layout } from "../Layout/Layout";
import Home from "../page/Home";
import MoviesPage from '../features/movies/MoviesPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/movies/:category" element={<MoviesPage />} />
            </Route>
        </Routes>
    )
}

export default AppRouter