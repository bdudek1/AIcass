import React, {useState, useEffect} from 'react';

import StringUtils from '../../../utils/StringUtils';
import { usePromiseTracker } from "react-promise-tracker";

import './Spinner.scss';

const Spinner = () => {
    const { promiseInProgress } = usePromiseTracker();
    const [randomBinary, setRandomBinary] = useState(StringUtils.generateRandomBinaryString(8))

    let randomBinaryChangeInterval;

    useEffect(() => {
        randomBinaryChangeInterval = setInterval(() => setRandomBinary(StringUtils.generateRandomBinaryString(8)), 80);
    }, [])

    return (
        promiseInProgress &&
        <div className="book">
            <div className="book__page"></div>
            <div style={{fontSize: "x-small", color: "black", marginTop: "32px"}}>
                {`${randomBinary}`}
            </div>
        </div>
    );
};

export default Spinner;