import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function DietGoal() {

    const navigate = useNavigate();

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const data = new FormData();
        if (e.currentTarget.id === 'cut') {
            data.append('diet', 'cut');
        } else if (e.currentTarget.id === 'bulk') {
            data.append('diet', 'bulk');
        } else {
            data.append('diet', 'maintain');
        }
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/health/diet', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('diet', data.get('diet') as string);
        navigate('/diet/info');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Weight Goal</h1>
                <div className='tw-flex'>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='cut'
                            onClick={handleClick}>Cut</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'/>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='maintain'
                            onClick={handleClick}>Maintain</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'/>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='bulk'
                            onClick={handleClick}>Bulk</button>
                </div>
            </div>
        </Layout>
    );
}

export default DietGoal;