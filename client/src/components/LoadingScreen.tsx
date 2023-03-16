import React from 'react'
import useStore from '../store';
type Props = {

}



const LoadingScreen = ({ }: Props) => {

    const isLoading = useStore(state => state.loading)
    return (
        <div
            className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50'
            style={{
                display: isLoading ? 'flex' : 'none',
            }}
        >
            <span className='loader'></span>
        </div>
    );
};



export default LoadingScreen