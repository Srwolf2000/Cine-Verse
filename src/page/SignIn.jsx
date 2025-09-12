
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
        <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.7)_60%,_rgba(3,7,18,1)_90%)]">
            <div className="max-w-md w-full space-y-8 bg-black/50 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700/50">
                {/* Logo or Brand */}
                <div className="flex justify-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold font-poppins">
                        Cine<span className="text-red-600">Verse</span>
                    </h2>
                </div>

                {/* Title and Description */}
                <div className="text-center space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-poppins">
                        {t('signInEmail.signInTitle')}
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg max-w-sm mx-auto font-poppins">
                        {text}
                    </p>
                </div>

                {/* Form Component */}
                <div className="mt-8">
                    {component}
                </div>

                {/* Optional: Additional Links */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400 font-poppins">
                        {t('signInEmail.noAccount')}
                        <a href="/signup" className="ml-2 font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
                            {t('signInEmail.signUp')}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SingIn