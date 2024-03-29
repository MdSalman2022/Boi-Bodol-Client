import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { motion } from 'framer-motion';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn, allUsers } = useContext(AuthContext)

    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('')

    const { createUser, updateUser, providerLogin } = useContext(AuthContext)


    const [createdUserEmail, setCreatedUserEmail] = useState('')


    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';


    const handleLogin = data => {
        // console.log(data);
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)
                setLoginUserEmail(data.email)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
            })
    }


    const saveUser = (name, email, role) => {

        const user = { name, email, role }
        fetch(`${process.env.REACT_APP_SERVER_LINK}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('save user', data)
                setCreatedUserEmail(email)
            })
    }

    const googleSignIn = event => {
        event.preventDefault();

        let role = "user";
        const Provider = new GoogleAuthProvider();
        providerLogin(Provider)
            .then(result => {
                const user = result.user;
                let findUser = allUsers.find(u => u.email === user.email)
                if (findUser) {
                    navigate(from, { replace: true })
                }
                else {
                    saveUser(user.displayName, user.email, role)
                    navigate(from, { replace: true })
                }
            })
            .catch(error => console.error(error))
    }


    return (
        <motion.div className=' my-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0 }}
        >
            <div className="w-96 p-8 space-y-3 rounded-xl bg-transparent border-2 border-secondary mx-auto">
                <h1 className="text-3xl font-semibold text-center text-neutral">Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} novalidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label className="label"><span className="label-text text-neutral">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="label"><span className="label-text text-neutral">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 character or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-neutral hover:btn-secondary text-white w-full' value="Login" type="submit" />
                    <div>
                        {
                            loginError && <p className='text-red-500'>{loginError}</p>
                        }
                    </div>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="px-3 text-sm text-secondary">Login with Google</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={googleSignIn} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>

                </div>
                <p className="text-sm text-center sm:px-6 ">Don't have an account?
                    <Link to='/register' rel="noopener noreferrer" href="#" className="underline font-bold">Sign up</Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Login;