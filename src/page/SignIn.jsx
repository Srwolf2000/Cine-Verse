
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MailLogin from "../components/Form Login/MailLogin";
import PasswordLogin from "../components/Form Login/PasswordLogin";


function SingIn() {

const { t } = useTranslation();
    const dataUser = useSelector((state) => state.authLogin)

    const show = () => {
        if (!dataUser.email.isCorrect) {
            return {
                text: t('signInEmail.text'),
                component: <MailLogin />
            }

        } else if (dataUser.email.isCorrect && dataUser.email.value != '') {
            return {
                text:  t('signInPassword.text'),
                component: <PasswordLogin />
            }
        }
    }



    const { text, component } = show()



    return (

        <>

            <div className=" min-h-screen w-full flex  flex-col justify-center  items-center bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,07)_60%,_rgba(03,7,18,1)_90%)]">
                <div className="flex flex-col justify-center items-center my-8">
                    <h1 className="text-3xl font-poppins font-bold text-white mb-3 ">{t('signInEmail.signInTitle')}</h1>
                    <p className="text-lg  font-poppins font-normal text-white">{text}</p>
                </div>

                {component}

            </div>

        </>
    );
}

export default SingIn