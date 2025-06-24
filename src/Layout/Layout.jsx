
import { Outlet } from "react-router";
import Nav from "../components/Nav/Nav";




export function Layout() {


    return (
        <div  className=" flex flex-col justify-center  w-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,07)_60%,_rgba(03,7,18,1)_90%)]">
            <header className="w-full flex justify-center">
                <Nav />
            </header>
            <main>
                <Outlet />
                
            </main>
            <footer className="bg-black">

                Hi, I made this myself.
            </footer>
        </div>
    )
}