import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyUser } from "../features/auth/authLoginSlice"
import { PrimaryButton } from "../components/Button/Button";
function SingUp() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingUser = useSelector((state) => state.authLogin.error)

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [messageErrorEmail, setMessageErrorEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [errorUser, setErrorUser] = useState(false);
    const [messageErrorUser, setMessageErrorUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [messageErrorPassword, setMessageErrorPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [errorBirthdate, setErrorBirthdate] = useState(false);
    const [messageErrorBirthdate, setMessageErrorBirthdate] = useState('');
    const [thereAreErrors, setThereAreErrors] = useState(false);
    const [messageGeneralError, setMessageGeneralError] = useState('');

    useEffect(() => {
        if (existingUser) {
            setErrorEmail(true);
            setMessageErrorEmail(existingUser)
        }
    }, [existingUser])



    const handleSubmit = (event) => event.preventDefault();

    const handleEmailChange = (event) => { setEmail(event.target.value) };

    const handleUserNameChange = (event) => { setUserName(event.target.value) };

    const handlePasswordChange = (event) => { setPassword(event.target.value) };

    const handleBirthdateChange = (event) => { setBirthdate(event.target.value) };

    const checkEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        ;
        if (!emailRegex.test(email)) {
            setErrorEmail(true);
            setMessageErrorEmail('Please enter a valid email address.');
        } if (email.length === 0) {
            setErrorEmail(true);
            setMessageErrorEmail('Email is required.');
        } else {
            setErrorEmail(false);
            setMessageErrorEmail('');
            dispatch(verifyUser(email));
        }

    }

    const checkUserName = () => {
        if (userName.length === 0) {
            setErrorUser(true);
            setMessageErrorUser('UserName is required.');
        } else {
            setErrorUser(false);
            setMessageErrorUser('');
        }
    }

    const checkPassword = () => {
        if (password.length < 8) {
            setErrorPassword(true);
            setMessageErrorPassword('Password must be at least 8 characters long.');
        } else if (password.length === 0) {
            setErrorPassword(true);
            setMessageErrorPassword('Password is required.');
        } else if (!/[A-Z]/.test(password)) {
            setErrorPassword(true);
            setMessageErrorPassword('Password must contain at least one uppercase letter.');
        } else if (!/[a-z]/.test(password)) {
            setErrorPassword(true);
            setMessageErrorPassword('Password must contain at least one lowercase letter.');
        } else if (!/[0-9]/.test(password)) {
            setErrorPassword(true);
            setMessageErrorPassword('Password must contain at least one number.');
        } else {
            setErrorPassword(false);
            setMessageErrorPassword('');
        }
    }

    const checkBirthdate = () => {
        const today = new Date();
        const birthDateObj = new Date(birthdate);
        if (birthdate.length === 0) {
            setErrorBirthdate(true);
            setMessageErrorBirthdate('Birthdate is required.');
        } else if (birthDateObj >= today) {
            setErrorBirthdate(true);
            setMessageErrorBirthdate('Birthdate must be in the past.');
        } else {
            setErrorBirthdate(false);
            setMessageErrorBirthdate('');
        }
    }




    const handleButtonClick = () => {

        dispatch(registerUser({ email, password, userName, birthdate }));

        if (errorEmail || errorUser || errorPassword || errorBirthdate) {
            setThereAreErrors(true);
            setMessageGeneralError('Please fix the errors before submitting.');


        } else {
            setThereAreErrors(false);
            setMessageGeneralError('');

            navigate('/signIn');
        }




    }





    return (

        <>
            <div className=" min-h-screen w-full flex  flex-col justify-center  items-center bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,07)_60%,_rgba(03,7,18,1)_90%)]">
                <div className="flex flex-col justify-center items-center my-8">
                    <h1 className="text-3xl font-poppins font-bold text-white mb-3 ">Sing Up</h1>
                    <p className="text-lg  font-poppins font-normal text-white">Please enter your details to continue.</p>
                </div>
                <section className="w-6/12 h-92   rounded-lg  border-zinc-950  bg-zinc-900 py-10">
                    <div className="flex flex-col items-center justify-center h-full">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="w-full px-6">
                            <div className="mb-4">
                                <label className="block font-poppins text-white text-xl font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    onChange={handleEmailChange}
                                    onBlur={checkEmail}
                                    type="text"
                                    id="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 font-poppins text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email"
                                />
                                {errorEmail && <p className="text-red-500 text-xs italic mt-2">{messageErrorEmail}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block font-poppins text-white text-xl font-bold mb-2" htmlFor="userName">
                                    UserName
                                </label>
                                <input
                                    onChange={handleUserNameChange}
                                    onBlur={checkUserName}
                                    type="text"
                                    id="userName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 font-poppins text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="UserName"
                                />
                                {errorUser && <p className="text-red-500 text-xs italic mt-2">{messageErrorUser}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block font-poppins text-white text-xl font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    onChange={handlePasswordChange}
                                    onBlur={checkPassword}
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 font-poppins text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password"
                                />
                                {errorPassword && <p className="text-red-500 text-xs italic mt-2">{messageErrorPassword}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block font-poppins text-white text-xl font-bold mb-2" htmlFor="birthdate">
                                    birthdate
                                </label>
                                <input
                                    onChange={handleBirthdateChange}
                                    onBlur={checkBirthdate}
                                    type="date"
                                    id="birthdate"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 font-poppins text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="birthdate"
                                />
                                {errorBirthdate && <p className="text-red-500 text-xs italic mt-2">{messageErrorBirthdate}</p>}
                            </div>
                            {thereAreErrors && <div className=" flex justify-center bg-zinc-800 rounded-sm p-2 my-5 "><p className="text-red-500 text-xs italic ">{messageGeneralError}</p></div>}

                            <PrimaryButton text="continue" onClick={handleButtonClick} />

                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SingUp