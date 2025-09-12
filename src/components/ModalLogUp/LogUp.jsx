import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { PrimaryButton, SecondButton } from "../Button/Button";
import { closeModal } from "../../features/auth/authLoginSlice";

function LogUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleClickLogIn = () => {
        navigate('/signIn')
        dispatch(closeModal())
    }

    return (
        <>
            <section className=" fixed flex items-center justify-center w-screen h-screen bg-black/70 z-50 overflow-hidden ">
                <div className=" w-6/12 max-h-[90vh] rounded-lg  border-zinc-950  bg-zinc-900 p-10 shadow-[0_8px_20px_rgba(255,255,255,0.2)]">
                    <p className="font-poppins text-white text-xl font-medium mb-2">must log in to use these options. </p>
                    <div className="w-40 flex justify-between">
                        <PrimaryButton
                            text={'LogIn'}
                            onClick={handleClickLogIn} />
                        <SecondButton
                            text={'Cancel'}
                            onClick={() => dispatch(closeModal())} />
                    </div>

                </div>

            </section>
        </>
    )
}

export default LogUp