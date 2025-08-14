import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import HomeMedia from "../page/HomeMedia";
import CategoryPage from '../page/CategoryPage'
import Search from "../page/Search";
import DetailItems from "../components/DetailItems/DetailItems";

function AppRouter() {




    return (
        <Routes>
            <Route path="/" element={<Navigate to="/movie" replace />} />

            <Route path="/:media" element={<Layout />}>
                <Route index element={<HomeMedia />} />
                <Route path="category/:category/:code" element={<CategoryPage />} />
                <Route path="search" element={<Search />} />
                <Route path="view/:id" element={<DetailItems />} />
            </Route>
        </Routes>
    )
}

export default AppRouter