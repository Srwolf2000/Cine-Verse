import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../Button/Button";
import { setPassword } from "../../features/auth/authLoginSlice";
function PasswordLogin() {

    const [passwordUser, setPasswordUser] = useState('');
    // const [passwordIsWrong, setPasswordIsWrong] = useState(false);
      
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleFromSubmit = (e) => e.preventDefault();
    const handlePasswordChange = (e) => setPasswordUser(e.target.value);
    const emailUser = useSelector((state) => state.authLogin.email.value)
    const  passwordIsWrong = useSelector((state) => state.authLogin.error)


    const isPasswordValid = () => {
            dispatch(
                setPassword(passwordUser));
           
    }

    useEffect(() => {
  if (passwordIsWrong === null) {
    navigate('/movie');
  }
}, [passwordIsWrong, navigate]);



    return (
        <>
            <section className="w-6/12 h-92   rounded-lg  border-zinc-950  bg-zinc-900 py-10">
                <div className="flex flex-col items-start justify-center h-full ml-6 mb-8">
                    <h1 className="font-poppins text-white text-xl font-bold">{t('signInPassword.titleEmail')}</h1>
                    <p className="font-poppins text-gray-200 text-lg font-normal">{emailUser}</p>
                </div>

                <div className="flex flex-col items-center justify-center h-full">
                    <form
                        onSubmit={handleFromSubmit}
                        className="w-full px-6">
                        <div className="mb-4">
                            <label className="block font-poppins text-white text-xl font-bold mb-2" htmlFor="password">
                                {t('signInPassword.titlePassword')}
                            </label>
                            <input
                                onChange={handlePasswordChange}
                                type="password"
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 font-poppins text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={t('signInPassword.placeholder')}
                            />
                            {passwordIsWrong && <p className="text-red-500 text-xs italic mt-2">{t('signInPassword.textError')} </p>}
                        </div>

                        <PrimaryButton text={t('signInPassword.button')} onClick={isPasswordValid} />

                    </form>
                </div>
            </section>
        </>

    )
}

export default PasswordLogin;