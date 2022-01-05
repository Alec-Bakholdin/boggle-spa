import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Timer = ({endDate}) => {
    const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft(endDate));
    const [previousInterval, setPreviousInterval] = useState(null);
    useEffect(() => {
        if(previousInterval) clearInterval(previousInterval);
        const interval = setInterval(() => setSecondsLeft(getSecondsLeft(endDate)), 250);
        setPreviousInterval(interval);
    }, [endDate])
    const minutes = secondsLeft > 0 ? parseInt(secondsLeft/60) : 0;
    const seconds = secondsLeft > 0 ? secondsLeft % 60 : 0;
    return (
        <span>Time remaining: {minutes}:{seconds}</span>
    );
}

const getSecondsLeft = (endDate) => {
    const msLeft = endDate - Date.now();
    return parseInt(msLeft/1000);
}

Timer.propTypes = {
    endDate: PropTypes.number.isRequired
}

export default Timer;