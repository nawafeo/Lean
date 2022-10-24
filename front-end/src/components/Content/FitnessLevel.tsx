import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function FitnessLevel() {

    const navigate = useNavigate();

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const data = new FormData();
        if (e.currentTarget.id === 'beginner') {
            data.append('experience', 'beginner');
        } else if (e.currentTarget.id === 'intermediate') {
            data.append('experience', 'intermediate');
        } else {
            data.append('experience', 'advanced');
        }
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/health/fitness/experience', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('experience', data.get('experience') as string);
        navigate('/fitness/equipment');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Lifting Experience</h1>
                <div className='tw-flex'>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8.25rem] tw-rounded-box tw-text-base'
                            id='beginner' onClick={handleClick}>Beginner</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'/>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8.25rem] tw-rounded-box tw-text-base'
                            id='intermediate' onClick={handleClick}>Intermediate</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'/>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8.25rem] tw-rounded-box tw-text-base'
                            id='advanced' onClick={handleClick}>Advanced</button>
                </div>
            </div>
        </Layout>
    );
}

export default FitnessLevel;