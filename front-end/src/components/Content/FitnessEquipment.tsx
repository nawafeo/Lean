import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function FitnessEquipment() {

    const navigate = useNavigate();

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const data = new FormData();
        if (e.currentTarget.id === 'yes') {
            data.append('equipment', 'yes');
        } else {
            data.append('equipment', 'no');
        }
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/health/fitness/equipment', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('equipment', data.get('equipment') as string);
        navigate('/fitness/info');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Lifting Equipment</h1>
                <h2 className='tw-text-2xl tw-font-bold tw-mb-[6%]'>Do you have access to a gym or weightlifting
                    equipment?</h2>
                <div className='tw-flex tw-justify-center'>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='yes'
                            onClick={handleClick}>Yes</button>
                    <div className='tw-daisy-divider tw-daisy-divider-horizontal'>OR</div>
                    <button className='tw-daisy-btn tw-h-[4rem] tw-w-[8rem] tw-rounded-box tw-text-base' id='no'
                            onClick={handleClick}>No</button>
                </div>
            </div>
        </Layout>
    );
}

export default FitnessEquipment;