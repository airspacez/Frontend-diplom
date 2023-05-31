

import { useState, useEffect, forwardRef } from 'react'

import TextField from "@mui/material/TextField";
import SelectLabels from '../Select/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DataAccessService from '../../Services/DataAccessService';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@mui/material/Slide';
import {DialogActions} from '@mui/material';
import MultipleSelectCheckmarks from '../MultipleSelectCheckmarks/MultipleSelectCheckmarks'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { format, parseISO } from 'date-fns';
import { convertCitiesForSelectComponent } from '../../Utils/DataConverterUtils'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Hidden } from '@mui/material';
import  Checkbox  from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ConfirmDialog(props) {
    const { open } = props;
    const { onConfirm } = props;
    const { onCancel } = props;
    const { title } = props;
    const { info } = props;
    const { OkTitle } = props;
    const { CancelTitle } = props;

   

    return (
       
            <Dialog 
            open={open}
            TransitionComponent={Transition}
            scroll='paper'
            PaperProps={{
                sx:{
                    background:"#333333"
                }
            }}>
            <DialogTitle sx={{color:"#EBE5D7"}} id="scroll-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent sx={{fontSize:"14pt", color:"#EBE5D7"}}>
                {info}
            </DialogContent>
           
            <DialogActions sx={{display:'flex', justifyContent:'space-evenly'}}> 
            <Button  style={{color:"#EBE5D7"}} onClick={onCancel}>{CancelTitle}</Button> 
            <Button style={{color:"#EBE5D7"}}  onClick={onConfirm} >{OkTitle}</Button>
            </DialogActions>
            
            
            </Dialog>
        
    )
}

