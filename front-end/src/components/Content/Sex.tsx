import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Sex() {

    const navigate = useNavigate();

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const data = new FormData();
        if (e.currentTarget.id === 'male') {
            data.append('sex', 'male');
        } else {
            data.append('sex', 'female');
        }
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/person/update/sex', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('sex', data.get('sex') as string);
        navigate('/info/age');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[29rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Sex</h1>
                <div className='tw-flex'>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='male'
                            onClick={handleClick}>Male</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'>OR</div>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='female'
                            onClick={handleClick}>Female</button>
                </div>
            </div>
        </Layout>
    );
}

export default Sex;