import React, { useState } from 'react';
import Layout from './Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [error, setError] = useState('none');

    const navigate = useNavigate();

    const display = {
        display: error
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/user/authenticate', true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                if (xhttp.response != null && xhttp.response != '') {
                    localStorage.setItem('member', xhttp.response);
                    navigate('/');
                } else {
                    setError('flex');
                }
            }
        }
        xhttp.send(data);
    }

    return (
        <Layout>
            <div className='tw-flex tw-text-center tw-items-center tw-bg-neutral tw-p-20 tw-bg-opacity-50
            tw-aspect-square tw-rounded-[50%] tw-my-4'>
                <div className='tw-max-w-[29rem]'>
                    <h1 className='tw-text-5xl tw-font-bold'>Login</h1>
                    <p className='tw-my-6'>Login to access your saved information, progress, and
                        more!</p>
                    <div className='tw-daisy-alert tw-daisy-alert-error tw-bg-red-500 tw-shadow-lg tw-justify-center
                    tw-mb-2' style={display}>
                        <div>
                            <svg xmlns='http://www.w3.org/2000/svg' className='tw-stroke-current tw-flex-shrink-0
                            tw-h-6 tw-w-6'
                                 fill='none' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                      d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <span>Username or password is incorrect.</span>
                        </div>
                    </div>
                    <form className='tw-daisy-form-control' onSubmit={handleSubmit}>
                        <label className='tw-daisy-label tw-ml-[25%]' htmlFor='username'>
                            <span className='tw-daisy-label-text'>Your username</span>
                        </label>
                        <input type='text' placeholder='Username'
                               className='tw-daisy-input tw-daisy-input-bordered tw-w-[50%] tw-m-auto
                               tw-bg-neutral-focus tw-mb-2' id='username' name='username'
                               autoComplete='new-password' required />
                        <label className='tw-daisy-label tw-ml-[25%]' htmlFor='password'>
                            <span className='tw-daisy-label-text'>Your password</span>
                        </label>
                        <input type='password' placeholder='Password'
                               className='tw-daisy-input tw-daisy-input-bordered tw-w-[50%] tw-m-auto
                               tw-bg-neutral-focus' id='password' name='password' autoComplete='new-password'
                               required />
                        <input type='submit' value='Login'
                               className='tw-daisy-btn tw-daisy-btn-primary tw-w-[50%] tw-mx-auto tw-mt-4' />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Login;