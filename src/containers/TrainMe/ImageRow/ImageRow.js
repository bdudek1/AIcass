import React, {useEffect, useState} from 'react';

import './ImageRow.css'

import BackspaceIcon from '@material-ui/icons/Backspace';
import MarkViewButton from '../../../components/UI/Button/MarkViewButton/MarkViewButton';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const ImageRow = (props) => {
    const isMobile = useMediaQuery('(max-width:768px)')
    const isSmallMobile = useMediaQuery('(max-width:500px)')
    const isVerySmallMobile = useMediaQuery('(max-width:400px)')
    const isExtremelySmallMobile = useMediaQuery('(max-width:300px)')

    const [isView, setIsView] = useState(false);

    useEffect(() => {
        setIsView(props.isView)
    }, [props.isView])

    let imgNameDisplayText = props.item;
    let imgNameLength = props.item.length;

    if(imgNameLength > 30){
        imgNameDisplayText = imgNameDisplayText.substring(0, 22) + "..."
    }
    if(isMobile && imgNameLength > 24){
        imgNameDisplayText = imgNameDisplayText.substring(0, 22) + "..."
    }
    if(isSmallMobile && imgNameLength > 19){
        imgNameDisplayText = imgNameDisplayText.substring(0, 17) + "..."
    }
    if(isVerySmallMobile && imgNameLength > 8){
        imgNameDisplayText = imgNameDisplayText.substring(0, 6) + "..."
    }
    if(isExtremelySmallMobile && imgNameLength > 6){
        imgNameDisplayText = imgNameDisplayText.substring(0, 4) + "..."
    }

    return(
            <div onClick={props.click} className="ImageRow">
                <span style={{padding: "3px 10px"}} >{imgNameDisplayText}
                    <BackspaceIcon className="HidingIcon"/>
                </span> 
                <MarkViewButton id={props.item}
                                //clicked={() => (props.viewClick(props.item))}
                                view={isView}
                                viewPrediction={props.viewPrediction}/> 
            </div>
    )
}

export default ImageRow;