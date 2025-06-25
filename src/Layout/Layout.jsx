
import { Outlet } from "react-router";
import Nav from "../components/Nav/Nav";




export function Layout() {


    return (
        <div  className=" min-h-screen flex flex-col w-full items-center bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,07)_60%,_rgba(03,7,18,1)_90%)]">
            <header className="w-full flex justify-center">
                <Nav />
            </header>
            <main className="w-full">
                <Outlet />
                
            </main>
            <footer className="bg-black">

                Hi, I made this myself.
            </footer>
        </div>
    )
}