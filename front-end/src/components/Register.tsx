import React, { useState } from 'react';
import Layout from './Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [error, setError] = useState({
        display: 'none',
        type: 'none'
    });

    const navigate = useNavigate();

    const display = {
        display: error.display
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        if (data.get('password') !== data.get('confirm')) {
            (document.getElementById('confirm') as HTMLInputElement).setCustomValidity('The two passwords ' +
                'must match.');
            (document.getElementById('confirm') as HTMLInputElement).reportValidity();
        } else {
            if (data.get('username')!.toString().length < 3) {
                setError({display: 'flex', type: 'username'});
                return;
            } else if (data.get('password')!.toString().length < 6) {
                setError({display: 'flex', type: 'password'});
                return;
            }
            const username = new FormData();
            username.append('username', data.get('username')!);
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST','/api/user/exists', true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    if (xhttp.response === 'true') {
                        setError({display: 'flex', type: 'user'});
                    } else if (xhttp.response === 'false') {
                        xhttp.open('POST', '/api/user/create', true);
                        xhttp.send(data);
                        navigate('/login');
                    }
                }
            }
            xhttp.send(username);
        }
    }

    function setValidity() {
        (document.getElementById('confirm') as HTMLInputElement).setCustomValidity('');
    }

    function errorMessage() {
        if (error.type === 'username') {
            return 'Username must be more than 2 characters long.'
        } else if (error.type === 'password') {
            return 'Password must be more than 5 characters long';
        } else {
            return 'Username is already taken';
        }
    }

    return (
        <Layout>
            <div className='tw-flex tw-text-center tw-items-center tw-bg-neutral tw-p-[4.8rem] tw-bg-opacity-50
            tw-aspect-square tw-rounded-[50%] tw-my-4'>
                <div className='tw-max-w-[29rem]'>
                    <h1 className='tw-text-5xl tw-font-bold'>Register</h1>
                    <p className='tw-my-6'>Create an account to save your information, track your progress, and
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
                            <span>{errorMessage()}</span>
                        </div>
                    </div>
                    <form className='tw-daisy-form-control'>
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
                        <input type='password' placeholder='Confirm Password'
                               className='tw-daisy-input tw-daisy-input-bordered tw-w-[50%] tw-m-auto
                               tw-bg-neutral-focus tw-mt-2' id='confirm' name='confirm'
                               autoComplete='new-password' onInput={setValidity} required />
                        <input type='button' value='Register'
                               className='tw-daisy-btn tw-daisy-btn-primary tw-w-[50%] tw-mx-auto tw-mt-4'
                               onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Register;