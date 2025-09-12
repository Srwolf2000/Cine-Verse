import { Routes, Route, Navigate } from "react-router";
import { Layout } from "../Layout/Layout";
import HomeMedia from "../page/HomeMedia";
import CategoryPage from '../page/CategoryPage'
import Search from "../page/Search";
import DetailItems from "../components/DetailItems/DetailItems";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Profile from "../page/Profile";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";

function AppRouter() {




    return (
        <Routes>
            <Route path="/" element={<Navigate to="/signIn" replace />} />



            <Route path="/" element={<Layout />}>
                <Route path="signUp" element={
                    <PublicRoute>
                        <SignUp />
                    </PublicRoute>
                } />
                <Route index element={<Navigate to="/signIn" replace />} />
                <Route path="signIn" element={
                    <PublicRoute>
                        <SignIn />
                    </PublicRoute>
                } />
            
                <Route path=":media" element={<HomeMedia />} />
                <Route path="category/:category/:code" element={<CategoryPage />} />
                <Route path="search" element={<Search />} />
                <Route path="/:media/view/:id" element={<DetailItems />} />


                <Route path="profile" element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                } />
                
            </Route>
        </Routes>
    )
}

export default AppRouter