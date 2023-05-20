import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    active:{
        textDecoration:"underline",
        textDecorationColor:"#8B0000",
        textDecorationThickness:"3px",
        textDecorationSkipInk:"none"
    },
    btn_container:
    {
        cursor:"pointer",
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        width:"100%",
        height:"100%",
        paddingLeft:"20px",
        paddingRight:"20px",
        color:"black",
        fontFamily:"'Oswald', sans-serif",
        fontSize:"16pt",
        borderRadius:"8px",
        '&:hover':
        {   
            background:"#D9D2C4"
        }
    },
    btn_text:
    {   
        lineHeight:"3rem",
        textTransform:"uppercase",

    }
}));

export default function ToolBarButton(props)
{
    
    const { buttonId, label, activeButtonId, onButtonClick } = props;
    const isActive = activeButtonId === buttonId;
    const styles = useStyles();

    const handleClick = () => {
        if (!isActive) { 
      onButtonClick(buttonId);
    }
      }
    return (
      
        <div  className={styles.btn_container + " " + (isActive? styles.active : "")} onClick={handleClick}>
            <span className={styles.btn_text}>{label}</span>
        </div>
      
    )
}