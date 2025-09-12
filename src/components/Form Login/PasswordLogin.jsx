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
        <div className="space-y-6">
            {/* Email Display */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400">
                    {t('signInPassword.titleEmail')}
                </h3>
                <p className="mt-1 text-base font-medium text-white break-all">
                    {emailUser}
                </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handleFromSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label 
                        htmlFor="password" 
                        className="block text-sm font-medium text-gray-200"
                    >
                        {t('signInPassword.titlePassword')}
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            onChange={handlePasswordChange}
                            className={`
                                block w-full px-4 py-3 rounded-lg
                                bg-gray-900/50 border ${passwordIsWrong ? 'border-red-500' : 'border-gray-600'}
                                text-white placeholder-gray-400
                                focus:outline-none focus:ring-2 ${passwordIsWrong ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent
                                transition-all duration-200
                            `}
                            placeholder={t('signInPassword.placeholder')}
                        />
                        {passwordIsWrong && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    {passwordIsWrong && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                            <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {t('signInPassword.textError')}
                        </p>
                    )}
                </div>

                {/* Login Button */}
                <div>
                    <button
                        type="button"
                        onClick={isPasswordValid}
                        className={`
                            w-full px-4 py-3 text-sm font-medium rounded-lg
                            bg-red-600
                            text-white shadow-lg
                            hover:bg-red-700
                            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900
                            transform transition-all duration-200 hover:scale-105
                            flex items-center justify-center space-x-2
                            font-poppins
                        `}
                    >
                        <span>{t('signInPassword.button')}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-center">
                    <a href="#" className="text-sm text-blue-500 hover:text-blue-400 transition-colors duration-200">
                        {t('signInPassword.forgotPassword')}
                    </a>
                </div>
            </form>
        </div>
    )
}

export default PasswordLogin;