import * as React from 'react';
import UserSearchResultCard from '../components/UserSearchResultCard/UserSearchResultCard';
import GameCardAnonimous from "../components/GameCard/GameCardAnonimous"
import { useState, useEffect } from 'react'
import DataAccessService from '../Services/DataAccessService';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import TextField from "@mui/material/TextField";
import SelectLabels from '../components/Select/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Pagination from '@material-ui/lab/Pagination';
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {convertGameTypesForSelectComponent, convertGameResultsForSelectComponent, convertGamePlacesForSelectComponent} from '../Utils/DataConverterUtils'
import { getDate, getMonth, getYear } from 'date-fns';
import { InputAdornment } from '@mui/material';
import SearchIcon from "@material-ui/icons/Search";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
const useStyles = makeStyles((theme) => ({

    h1:
    {
        marginTop: "32px",
        marginBottom: "32px",
        textAlign: "left",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "28pt",
        lineHeight: "1em",
        textTransform: "uppercase",

    },
    text_light:
    {
        color: "#EBE5D7"
    },
    filter_container:
    {
        marginBottom:"16px",
        justifyContent:"end",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height:"fit-content"
    },
    user_filter_container:
    {
        marginBottom:"16px",
        justifyContent:"end",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        height:"fit-content",
        [theme.breakpoints.down("xs")]:
        {
            flexWrap: "wrap",
        }
    },
    pagination_container:
    {
        
        display: "inline-flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        width: "100%"
    },
    pagination_count_container:
    {
        
     
    },
    games_list:
    {
        marginBottom:"32px"
    },

    root: {
        '& .MuiPaginationItem-root': {
          color: '#EBE5D7',
          fontSize:"14pt",
          
        },
      },
    filter_dialog:
    {
        '&.MuiDialog-root .MuiDialog-container .MuiPaper-root':
        {
            background:"#333333"
        }
    },
    desktop_date_picker_dark:
    {
        '& .Mui-Paper-root':
        {
            background:"red"
        }
    },
    dialog_button:
    {
        color:"#EBE5D7",
        fontSize:"12pt"
    },
    filter_dialog_title:
    {
        color:"#EBE5D7",
        fontSize:"12pt"
    },
    show_filter_button:
    {
        marginRight:"12px",
        color:"#EBE5D7",
        fontSize:"12pt"
    },
    dialog_select:
    {
        marginBottom:"12px"
    },
    player_search_container:
    {
        display:"flex",
        maxWidth:"100%",
        width:"100%",
        marginRight:"12px",
        [theme.breakpoints.down('xs')]:
        {
            marginRight:"0px",
            marginBottom:"12px"
        }
    }


}))



export default function ArhivePage() {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [usersPage, setUsersPage] = useState(1);
    const [userLastGames, setUserLastGames] = useState(null);
    const [users, setUsers] = useState(null);

    const [countPerPage, setCountPerPage] = useState(10);
    const [countPerPageUsers, setCountPerPageUsers] = useState(10);

    const [gameTypeFilterData, setGameTypeFilterData] = useState(undefined);
    const [gamePlaceFilterData, setGamePlaceFilterData] = useState(undefined);
    const [gameResultFilterData, setGameResultFilterData] = useState(undefined);
    const [usersSearchString, setUsersSearchString] = useState("");

    const [gameTypeSelectedValue, setGameTypeSelectedValue] = useState(undefined);
    const [gameResulteSelectedValue, setGameResultSelectedValue] = useState(undefined);
    const [gamePlaceSelectedValue, setGamePlaceSelectedValue] = useState(undefined);
    const [gameDateSelectedValue, setGameDateSelectedValue] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUsersPageChange = async (event, value) => {
        setUsersPage(value);
        var data = await DataAccessService.getUsersBySearchString(usersSearchString, value-1, countPerPageUsers)
        setUsers(data);
    };


    const handleChange = async (event, value) => {
        setPage(value);
        var data = await DataAccessService.getarchiveGamesByFilter(getDate(gameDateSelectedValue), getMonth(gameDateSelectedValue)+1, getYear(gameDateSelectedValue), gamePlaceSelectedValue,gameResulteSelectedValue, gameTypeSelectedValue, value-1, countPerPage)
        setUserLastGames(data);
    };

 
        
    const [tabPage, setTabPage] = useState(0);

    const handleTabPageChange = (event, newValue) => {
        setTabPage(newValue);
        console.log(newValue);
    };

   

    const handlePageCountSelectChange = async (value) => 
    {
        setCountPerPage(value);
        var data = await  await DataAccessService.getarchiveGamesByFilter(getDate(gameDateSelectedValue), getMonth(gameDateSelectedValue)+1, getYear(gameDateSelectedValue), gamePlaceSelectedValue,gameResulteSelectedValue, gameTypeSelectedValue, 0, value)
        setPage(1);
        setUserLastGames(data);
        
    }


    const handlePageCountUsersSelectChange = async (value) => 
    {
        setCountPerPageUsers(value);
        var data = await DataAccessService.getUsersBySearchString(usersSearchString, usersPage-1, value);
        setUsersPage(1);
        setUsers(data);
        
    }


    const styles = useStyles();
    useEffect(() => {
        if (tabPage === 0 && !userLastGames ) {
        async function fetchStatistics() {

            const lastGamesData = await DataAccessService.getarchiveGamesByFilter(getDate(gameDateSelectedValue), getMonth(gameDateSelectedValue)+1, getYear(gameDateSelectedValue), gamePlaceSelectedValue,gameResulteSelectedValue, gameTypeSelectedValue, 0, countPerPage)
            setUserLastGames(lastGamesData);
            console.log(lastGamesData);

        }
        fetchStatistics();
        }
        if (tabPage === 1 && !users ) {
            async function fetchUsers() {

                const usersData = await DataAccessService.getUsersBySearchString(usersSearchString, usersPage-1, countPerPageUsers);
                setUsers(usersData);
                console.log(usersData);
                
            }
            fetchUsers();
        }

    }, [tabPage]);

    return (

        <Container maxWidth="lg">
                 <Tabs value={tabPage} onChange={handleTabPageChange}  centered>
  <Tab  label="Игры" />
  <Tab label="Игроки" />
 
</Tabs>

            <div className={styles.h1 + " " + styles.text_light}>Игровой архив</div>
            {tabPage === 1 &&
            <>
            <div className={styles.user_filter_container}>
                <div className={styles.player_search_container}>
                <TextField value={usersSearchString} onKeyDown={(event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      DataAccessService.getUsersBySearchString(usersSearchString,usersPage-1, countPerPageUsers)
        .then((result) => setUsers(result))
        .catch((error) => console.log(error));
    }
  }}  sx={{
    
    '& .MuiInputBase-input':{
        color:"#EBE5D7"
    },
    '& .MuiSvgIcon-root ':
    {
        color:"#EBE5D7"
    },
    '& .MuiInputLabel-root ':
    {
        color:"#EBE5D7"
    },
    '& .MuiInputLabel-root.Mui-focused ':
    {
        color:"#EBE5D7"
    },
    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
        borderColor:"#EBE5D7"
    },
  }} onChange={(event) => {
                    setUsersSearchString(event.target.value);
                   }} InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }} size='small' fullWidth variant='outlined'  label="Поиск по нику"></TextField>
                
                </div>
                
                <div className={styles.pagination_count_container}><SelectLabels items={pageValues}  value={countPerPageUsers} onChange={handlePageCountUsersSelectChange} label="Показывать по" /></div></div>
               
            <div>
            {users?.content?.map(userdata => 

                <UserSearchResultCard data={userdata} key={userdata.id}/>
              
            )}
            </div>
            <div className={styles.pagination_container}>
                <Pagination size="large" variant="text" shape="rounded" classes={{ root: styles.root }} boundaryCount={1} siblingCount={0} count={users ? users.totalPages : 0 } page={usersPage} onChange={handleUsersPageChange}   />
            </div>  
            </>}

            {tabPage === 0 &&
            <>
            <div className={styles.filter_container}>
                <Button variant="outlined" className={styles.show_filter_button} onClick={handleClickOpen}>
                    Фильтр
                </Button>
                <div className={styles.pagination_count_container}><SelectLabels items={pageValues}  value={countPerPage} onChange={handlePageCountSelectChange} label="Показывать по" /></div></div>
               
            <div className={styles.games_list}>
                {userLastGames?.items?.map(gamedata => (

                    <GameCardAnonimous data={gamedata} key={gamedata.id} />
                ))}
            </div>
            <div className={styles.pagination_container}>
                <Pagination size="large" variant="text" shape="rounded" classes={{ root: styles.root }} boundaryCount={1} siblingCount={0} count={userLastGames ? userLastGames.totalPagesCount : 0 } page={page} onChange={handleChange} />
            </div>  
            </>}

















            <Dialog open={open} onClose={handleClose} className={styles.filter_dialog}>
                <DialogTitle className={styles.filter_dialog_title}>Фильтр</DialogTitle>
                <DialogContent >
                
                   <div className={styles.dialog_select}><SelectLabels value={gameTypeSelectedValue} items={gameTypeFilterData} onChange={(value)=>setGameTypeSelectedValue(value)} onOpen={ async ()=>{if(gameTypeFilterData === undefined) { setGameTypeFilterData([{value:-1, label:"Не выбрано"}, ...convertGameTypesForSelectComponent(await DataAccessService.getGameTypes())])}} } label="Тип игры"/></div>   
                   <div className={styles.dialog_select}>  <SelectLabels value={gameResulteSelectedValue} items={gameResultFilterData} onChange={(value)=>setGameResultSelectedValue(value)} onOpen={ async ()=>{if(gameResultFilterData === undefined) { setGameResultFilterData([{value:-1, label:"Не выбрано"}, ...convertGameResultsForSelectComponent(await DataAccessService.getGameResults())])}} } label="Исход"/>   </div>
                   <div className={styles.dialog_select}><SelectLabels value={gamePlaceSelectedValue} items={gamePlaceFilterData} onChange={(value)=>setGamePlaceSelectedValue(value)} onOpen={ async ()=>{if(gamePlaceFilterData === undefined) { setGamePlaceFilterData([{value:-1, label:"Не выбрано"}, ...convertGamePlacesForSelectComponent(await DataAccessService.getGamePlaces()).sort((a, b) => a.label.localeCompare(b.label))])}} } label="Место"/></div>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker 
                    value={gameDateSelectedValue}
                    onChange={(date)=> setGameDateSelectedValue(date)}
                    className={styles.desktop_date_picker_dark}
                    label={'Дата игры'}
                    slotProps={{
                    
                        textField:
                        {
                            sx:
                            {
                                '& .MuiInputBase-input':
                                {
                                    color:"#EBE5D7",
                                    fontSize:"12pt",
                             
                                },
                                
                                '& .MuiInputLabel-root':
                                {
                                    color:"#EBE5D7",
                                    fontSize:"12pt"
                                },
                                '.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                    border:"2px solid #EBE5D7"
                                },
                                '& .MuiSvgIcon-root':
                                {
                                    color:"#EBE5D7"
                                }
                            }
                        },
                        popper:{sx:
                        {
                            '& .MuiPaper-root':
                            {
                                background:"#484646",    
                            },
                            '& .MuiPickersDay-root':
                            {
                                color:"#EBE5D7",
                                fontSize:"12pt",
                                '&:hover':
                                {
                                    backgroundColor:"rgba(235, 229, 215, 0.04)"
                                }
                            },
                            '& .MuiDayCalendar-weekDayLabel':
                            {
                                color:"#EBE5D7",
                                fontSize:"12pt"
                            },
                            '& .MuiPickersCalendarHeader-label':
                            {
                                color:"#EBE5D7",
                                fontSize:"12pt"
                            },
                            '& .MuiSvgIcon-root':
                            {
                                color:"#EBE5D7"
                            },
                            '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected':
                            {
                                backgroundColor:"#EBE5D7",
                                color:"#333333"

                            },
                            '& .MuiPickersYear-yearButton':
                            {
                                color:"#EBE5D7",
                                fontSize:"12pt",
                                '&.Mui-selected':
                                {
                                    backgroundColor:"#EBE5D7",
                                    color:"#000"
                                },
                                '&:hover':
                                {
                                    backgroundColor:"rgba(235, 229, 215, 0.04)"
                                }

                                
                            }
                        }}
                    }} 
                      /> 
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}  className={styles.dialog_button}>
                        Отменаfdgjkl
                    </Button>
                    <Button onClick={ async ()=> { console.log(gameDateSelectedValue); setUserLastGames(await DataAccessService.getarchiveGamesByFilter(getDate(gameDateSelectedValue), getMonth(gameDateSelectedValue)+1, getYear(gameDateSelectedValue), gamePlaceSelectedValue,gameResulteSelectedValue, gameTypeSelectedValue, 0, countPerPage)); setPage(1); handleClose(); } }  className={styles.dialog_button}>
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>

    )
}


const pageValues = [
    {
        value: 10,
        label: "10"
    },
    {
        value: 20,
        label: "20"
    },
    {
        value: 30,
        label: "30"
    },
    {
        value: 40,
        label: "40"
    },
]
