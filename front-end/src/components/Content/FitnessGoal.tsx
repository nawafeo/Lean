import React, { useEffect, useState } from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function FitnessGoal() {

    const [selected, setSelected] = useState({
        endurance: false,
        muscle: false,
        strength: false
    });

    const [btnDisplay, setBtnDisplay] = useState('none');

    const navigate = useNavigate();

    const display = {
        display: btnDisplay
    }

    useEffect(() => {
        if (selected.endurance || selected.muscle || selected.strength) {
            setBtnDisplay('inline-flex');
        } else {
            setBtnDisplay('none');
        }
    }, [selected]);

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        let selectedCount = 0;
        Object.values(selected).forEach((value) => {
            if (value) {
                selectedCount++;
            }
        });
        if (e.currentTarget.id === 'fat') {
            if (!selected.endurance && selectedCount < 2) {
                setSelected({endurance: true, muscle: selected.muscle, strength: selected.strength});
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#333333';
            } else {
                setSelected({endurance: false, muscle: selected.muscle, strength: selected.strength});
                e.currentTarget.style.background = '#171618';
                e.currentTarget.style.color = '#DCA54C';
            }
        } else if (e.currentTarget.id === 'muscle') {
            if (!selected.muscle && selectedCount < 2) {
                setSelected({endurance: selected.endurance, muscle: true, strength: selected.strength});
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#333333';
            } else {
                setSelected({endurance: selected.endurance, muscle: false, strength: selected.strength});
                e.currentTarget.style.background = '#171618';
                e.currentTarget.style.color = '#DCA54C';
            }
        } else {
            if (!selected.strength && selectedCount < 2) {
                setSelected({endurance: selected.endurance, muscle: selected.muscle, strength: true});
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#333333';
            } else {
                setSelected({endurance: selected.endurance, muscle: selected.muscle, strength: false});
                e.currentTarget.style.background = '#171618';
                e.currentTarget.style.color = '#DCA54C';
            }
        }
    }

    function handleNext() {
        let data: String[] = [];
        Object.entries(selected).forEach(([key, value]) => {
            if (value) {
                data.push(key);
            }
        });
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.push(localStorage.getItem('member')!);
            xhttp.open('POST', '/api/health/fitness', true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(data));
            data.pop();
        }
        sessionStorage.setItem('goals', JSON.stringify(data));
        navigate('/fitness/level');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Fitness Goals</h1>
                <p className='tw-text-xl tw-font-bold tw-mb-[5%]'>Pick up to 2</p>
                <div className='tw-flex tw-justify-center'>
                    <button className='tw-daisy-btn tw-h-[4.25rem] tw-w-[8.25rem] tw-rounded-box tw-text-base' id='fat'
                            onClick={handleClick}>Build Endurance</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'/>
                    <button className='tw-daisy-btn tw-h-[4.25rem] tw-w-[8.25rem] tw-rounded-box tw-text-base'
                            id='muscle' onClick={handleClick}>Build Muscle</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'/>
                    <button className='tw-daisy-btn tw-h-[4.25rem] tw-w-[8.25rem] tw-rounded-box tw-text-base'
                            id='strength' onClick={handleClick}>Build Strength</button>
                </div>
                <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-8'
                        onClick={handleNext} style={display}>Next</button>
            </div>
        </Layout>
    );
}

export default FitnessGoal;