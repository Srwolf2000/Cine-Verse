import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../Button/Button";
import { setEmail } from "../../features/auth/authLoginSlice";
function MailLogin() {

    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [emailForm, setEmailForm] = useState('');
    const [emailIsWrong, setEmailIsWrong] = useState(false)
    const error = useSelector((state) => state.authLogin.error)

    useEffect(() => {
        if (error) {
            setEmailIsWrong(true);

        }
    }, [error]);



    const handleFromSubmit = (e) => e.preventDefault();

    const handleEmailChange = (e) => {
        setEmailForm(e.target.value);
        setEmailIsWrong(false);


    };




    const emailIsValid = () => {
        if (!emailIsWrong) {
            dispatch(setEmail(emailForm))
        }
        setEmailIsWrong(true)

    }




    return (
        <section className="w-6/12 h-92   rounded-lg  border-zinc-950  bg-zinc-900 py-10">
            <div className="flex flex-col items-center justify-center h-full">
                <form
                    onSubmit={handleFromSubmit}
                    className="w-full px-6">
                    <div className="mb-4">
                        <label className="block font-poppins text-white text-xl font-bold mb-2" htmlFor="email">
                            {t('signInEmail.titleFormMail')}
                        </label>
                        <input
                            onChange={handleEmailChange}
                            type="text"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 font-poppins text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={t('signInEmail.placeholder')}
                        />
                        {emailIsWrong && <p className="text-red-500 text-xs italic mt-2">{t('signIn.textError')} </p>}
                    </div>

                    <PrimaryButton text={t('signInEmail.button')} onClick={emailIsValid} />

                </form>
            </div>
        </section>
    );
}

export default MailLogin;