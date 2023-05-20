import React from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {useNavigate} from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import AuthService from "../../Services/AuthService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:"end",
    [theme.breakpoints.up('md')]: {
      maxWidth:"150px",
      width:"150px",
    },
  },
  paper: {
    background:"#D8D1C1",
    marginTop:8
  },
  profileMenuItem:{
    fontFamily: "'Oswald', sans-serif",
    fontSize:"14pt",
    fontWeight:"500",
    paddingLeft:"20px"
  },
  my_profile_container:
  {
      display: "flex",
      justifyContent: "end",
      boxSizing: "border-box",
     

  },
  my_profile_btn:
  {
      display: "flex",
      color:"#000",
      height: "100%",
      cursor: "pointer",
  },
  my_profile_img_container:
  {
      userSelect: "none",
      width: "48px",
      height: "48px",
      alignSelf: "center",
      background: "#fff",
      borderRadius: "50%",
      overflow:"hidden",
      boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2)",

  },
  
  my_profile_dropdown_img_container:
  {
      userSelect: "none",
      width: "192px",
      height: "256px",
      alignSelf: "center",
      background: "#fff",
      borderRadius: "12px",
      overflow:"hidden",  
      marginRight:20,
      marginLeft:20,
      marginTop:10,
      marginBottom:10,
      boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2)",
  },
  profile_image_dropdown:
  {
    width:"100%",
    height:"100%",
    objectFit:"cover",
    objectPosition:"center"
  },
  my_profile_text:
  {
      fontFamily: "'Oswald', sans-serif",
      fontSize:"16pt",
      userSelect: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "end",
      
  },
  profile_image:
  {

    width:"100%",
    height:"100%",
    objectFit:"fit-content"

  }
}));

export default function ProfileDropdown(props) {
  const navigate = useNavigate();
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={styles.root}>
      <div>
        
          <div className={styles.my_profile_container}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
                        <IconButton size='small'>
                        <div className={styles.my_profile_btn}>
                            <div className={styles.my_profile_text + " col"}>
                                <span></span>
                            </div>
                            <div className={styles.my_profile_img_container}>
                                <img className={styles.profile_image} src={props.image} />
                            </div>
                        </div>
                        </IconButton>
                    </div>
               
       
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom-end'>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom-end' ? ' right top' : 'center bottom' }}
            >
              <Paper className={styles.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <div className={styles.my_profile_dropdown_img_container}>
                                <img className={styles.profile_image_dropdown} src={props.image} />
                            </div>
                    <MenuItem className={styles.profileMenuItem} onClick={(event) => { handleClose(event); navigate('/profile/me')}}>Профиль</MenuItem>
                    <MenuItem className={styles.profileMenuItem} onClick={(event) => { handleClose(event); AuthService.logout(); navigate('/auth')}}>Выйти</MenuItem>
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
