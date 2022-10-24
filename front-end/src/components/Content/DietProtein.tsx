import React, { useState } from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function DietProtein() {

    const [diet, setDiet] = useState({
        type: '',
        calories: ''
    });

    const [protein, setProtein] = useState('');

    const[displays, setDisplays] = useState({
        protein: 'none',
        buttons: 'flex'
    });

    const navigate = useNavigate();

    const display = {
        display: displays.protein
    }

    const btnDisplay = {
        display: displays.buttons
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e.currentTarget.id === 'yes') {
            const data = new FormData();
            data.append('name', sessionStorage.getItem('name')!);
            data.append('sex', sessionStorage.getItem('sex')!);
            data.append('age', sessionStorage.getItem('age')!);
            data.append('feet', sessionStorage.getItem('feet')!);
            data.append('inches', sessionStorage.getItem('inches')!);
            data.append('weight', sessionStorage.getItem('weight')!);
            data.append('bodyFatPercentage', sessionStorage.getItem('bodyFatPercentage')!);
            data.append('activity', sessionStorage.getItem('activity')!);
            data.append('diet', sessionStorage.getItem('diet')!);
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/api/health/get/data', true);
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    const health = xhttp.response;
                    setProtein(health[4]);
                    if (health[2] > health[3]) {
                        setDiet({type: 'cut', calories: health[3]});
                    } else if (health[2] < health[3]) {
                        setDiet({type: 'bulk', calories: health[3]});
                    } else {
                        setDiet({type: 'maintain', calories: health[3]});
                    }
                }
                setDisplays({protein: 'block', buttons: 'none'});
            }
            xhttp.responseType = 'json';
            xhttp.send(data);
        } else {
            navigate('/fitness');
        }
    }

    function dietTitle() {
        if (diet.type === 'cut') {
            return 'Cutting Calories';
        } else if (diet.type === 'bulk') {
            return 'Bulking Calories';
        } else if (diet.type === 'maintain') {
            return 'Maintenance Calories';
        }
    }

    function handleNext() {
        navigate('/fitness');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[6%]'>Diet Plan</h1>
                <h2 className='tw-text-2xl tw-font-bold tw-mb-[6%]'>Will you be actively engaging in anaerobic exercise
                    during this diet?</h2>
                <div className='tw-flex tw-justify-center' style={btnDisplay}>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='yes'
                            onClick={handleClick}>Yes</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'>OR</div>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='no'
                            onClick={handleClick}>No</button>
                </div>
                <div style={display}>
                    <div className='tw-daisy-stats tw-shadow tw-border-4 tw-border-neutral'>
                        <div className='tw-daisy-stat'>
                            <div className='tw-daisy-stat-figure tw-text-primary'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='-2 -2 24 24'
                                     className='tw-inline-block tw-w-10 tw-h-10 tw-stroke-current'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'
                                          d='M18 11v7a2 2 0 0 1-4 0v-5h-2V3a3 3 0 0 1 3-3h3v11zM4 10a2 2 0 0 1-2-2V1a1
                                          1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v7a2 2 0 0 1-2 2v8a2 2 0 0
                                          1-4 0v-8z' />
                                </svg>
                            </div>
                            <p className='tw-daisy-stat-title'>{dietTitle()}</p>
                            <p className='tw-daisy-stat-value'>{diet.calories}</p>
                        </div>
                        <div className='tw-daisy-stat'>
                            <div className='tw-daisy-stat-figure tw-text-primary'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 512 512'
                                     className='tw-inline-block tw-w-10 tw-h-10 tw-stroke-current'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='30'
                                          d='M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16
                                          16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64
                                          224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256
                                          32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16
                                          16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1
                                          16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z' />
                                </svg>
                            </div>
                            <p className='tw-daisy-stat-title'>Protein Intake</p>
                            <p className='tw-daisy-stat-value'>
                                {protein}<span className='tw-text-[1.75rem]'> g</span>
                            </p>
                        </div>
                    </div>
                    <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-8'
                            onClick={handleNext}>Next</button>
                </div>
            </div>
        </Layout>
    );
}

export default DietProtein;