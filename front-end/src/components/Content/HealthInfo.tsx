import React, { useEffect, useState } from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function HealthInfo() {

    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [BFP, setBFP] = useState('');
    const [activity, setActivity] = useState('');
    const [BMI, setBMI] = useState('');
    const [BMR, setBMR] = useState('');
    const [TDEE, setTDEE] = useState('');

    const navigate = useNavigate();
    const xhttp = new XMLHttpRequest();
    const data = new FormData();

    useEffect(() => {
        getHealth()
    }, []);

    function getHealth() {
        data.append('name', sessionStorage.getItem('name')!);
        data.append('sex', sessionStorage.getItem('sex')!);
        data.append('age', sessionStorage.getItem('age')!);
        data.append('feet', sessionStorage.getItem('feet')!);
        data.append('inches', sessionStorage.getItem('inches')!);
        data.append('weight', sessionStorage.getItem('weight')!);
        data.append('bodyFatPercentage', sessionStorage.getItem('bodyFatPercentage')!);
        data.append('activity', sessionStorage.getItem('activity')!);
        xhttp.open('POST', '/api/health/get', true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const health = xhttp.response;
                if (health != null) {
                    setName(health.person.name);
                    setSex(health.person.sex);
                    setAge(health.person.age);
                    setHeight(Math.floor(health.person.height / 12) + "' " + health.person.height % 12 + '"');
                    setWeight(health.person.weight);
                    if (health.person.bodyFatPercentage === null) {
                        setBFP('N/A');
                    } else {
                        setBFP(health.person.bodyFatPercentage);
                    }
                    setActivity(health.activity);
                    getHealthData();
                }
            }
        }
        xhttp.responseType = 'json';
        xhttp.send(data);
    }

    function getHealthData() {
        data.append('diet', sessionStorage.getItem('diet')!);
        xhttp.open('POST', '/api/health/get/data', true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const health = xhttp.response;
                setBMI(health[0]);
                setBMR(health[1]);
                setTDEE(health[2]);
            }
        }
        xhttp.responseType = 'json';
        xhttp.send(data);
    }

    function handleClick() {
        navigate('/diet');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-min-w-[44rem] tw-flex tw-flex-col tw-items-center tw-gap-y-8 tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold'>Your Information</h1>
                <table className='tw-daisy-table'>
                    <thead>
                    <tr>
                        <th/>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Age</th>
                        <th>Height</th>
                        <th>Weight (lbs)</th>
                        <th>Body Fat %</th>
                        <th>Activity Level</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th/>
                        <td>{name}</td>
                        <td>{sex.charAt(0) + sex.slice(1).toLowerCase()}</td>
                        <td>{age}</td>
                        <td>{height}</td>
                        <td>{weight}</td>
                        <td>{BFP}</td>
                        <td>{activity.charAt(0) + activity.slice(1).toLowerCase()}</td>
                    </tr>
                    </tbody>
                </table>
                <h2 className='tw-text-4xl tw-font-bold'>Health</h2>
                <div className='tw-daisy-stats tw-shadow tw-border-4 tw-border-neutral'>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-text-primary'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                 className='tw-inline-block tw-w-8 tw-h-8 tw-stroke-current'>
                                <circle cx={12} cy={7} r={6} strokeLinecap='round' strokeLinejoin='round'
                                        strokeWidth='2' />
                                <circle cx={12} cy={24} r={11} strokeLinecap='round' strokeLinejoin='round'
                                        strokeWidth='2' />
                                <line x1={0} y1={23} x2={24} y2={23} strokeLinecap='round' strokeLinejoin='round'
                                      strokeWidth='2' />
                            </svg>
                        </div>
                        <p className='tw-daisy-stat-title'>BMI</p>
                        <p className='tw-daisy-stat-value'>{BMI}</p>
                        <p className='tw-daisy-stat-desc'>Body Mass Index</p>
                    </div>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-text-primary'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                 className='tw-inline-block tw-w-8 tw-h-8 tw-stroke-current'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0
                                      00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                            </svg>
                        </div>
                        <p className='tw-daisy-stat-title'>BMR</p>
                        <p className='tw-daisy-stat-value'>{BMR}</p>
                        <p className='tw-daisy-stat-desc'>Basal Metabolic Rate</p>
                    </div>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-text-primary'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                 className='tw-inline-block tw-w-8 tw-h-8 tw-stroke-current'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                      d='M13 0 L4 14 h7 l-1 10 l9-14 h-7 z' />
                            </svg>
                        </div>
                        <p className='tw-daisy-stat-title'>TDEE</p>
                        <p className='tw-daisy-stat-value'>{TDEE}</p>
                        <p className='tw-daisy-stat-desc'>Total Daily Energy Expenditure</p>
                    </div>
                </div>
                <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-2'
                        onClick={handleClick}>Next</button>
            </div>
        </Layout>
    );
}

export default HealthInfo;