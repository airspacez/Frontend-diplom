import * as React from 'react';
import InputLabel from  '@material-ui/core/InputLabel';
import MenuItem from  '@material-ui/core/MenuItem';

import FormControl from  '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    
    select:
    { 

      borderColor:"#EBE5D7",
        textAlign:"left",
        fontFamily:"'Roboto', sans-serif",
        minWidth:"150px",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        borderColor:"#EBE5D7"
      },
      '& .MuiSelect-iconOutlined':
      {
        color:"#EBE5D7"
      },
        '& .MuiSelect-select':
        {
          fontSize:"14pt",
            color: "#EBE5D7",
            
        },
       
    },
    ".MuiMenu-paper":
    {
      background:"red"
    },
    select_menu_item:
    {
      fontFamily:"'Roboto', sans-serif",
      fontSize:"14pt"
    },
    label:
    {
      color: '#EBE5D7',
      borderColor:"red",
      fontSize:"12pt",  
      '&.Mui-focused':
      {
        color: '#EBE5D7',
      }
    },
    
    
    

    
}))

export default function SelectLabels(props) {
  const { items, label, value, onChange, onOpen, disabled } = props;
    
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);

  };

   
    
    const menuProps = {
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        style:{
            maxHeight:"500px",
            
        },
      
        PaperProps: {
          style: {
            
            background:"#484646",
            color:"#EBE5D7"
          }
        }
        
       
       
    }; 

   
    const styles = useStyles();
    return (
      
      <FormControl size='medium' variant="outlined" fullWidth  >
      <InputLabel className={styles.label}  id="demo-simple-select-outlined-label">{label}</InputLabel>
        
        <Select  
          disabled={disabled}
          className={styles.select}
          onOpen={onOpen}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-helper"
          value={(value === undefined)  ? "" : value }
          label={label} 
          onChange={handleChange}
          MenuProps={menuProps}
          
        >
          {(items === undefined) ? (
            <MenuItem disabled>
              Загрузка...
            </MenuItem>
          ) : (
            items.map(item => (
              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            ))
          )}
        </Select>
      
      </FormControl>
      
        
      
    );
  }