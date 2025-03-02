import React from 'react';

const WavingBackground = () => {
    return (
        <div className='relative w-full h-96 overflow-hidden'>
            <div className="bg-wave"></div>
            <div className="bg-wave"></div>
            <div className="bg-wave"></div>
            <div className="bg-wave"></div>
        </div>
    );
}

export default WavingBackground;
