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
import { convertGameTypesForSelectComponent, convertGameResultsForSelectComponent, convertGamePlacesForSelectComponent } from '../Utils/DataConverterUtils'
import { getDate, getMonth, getYear } from 'date-fns';
import { InputAdornment } from '@mui/material';
import SearchIcon from "@material-ui/icons/Search";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import UserRatingRow from '../components/UserRatingRow/UserRatingRow';
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
        marginBottom: "16px",
        justifyContent: "end",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "fit-content"
    },
    user_filter_container:
    {
        marginBottom: "16px",
        justifyContent: "end",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        height: "fit-content",
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
        marginBottom: "32px"
    },

    root: {
        '& .MuiPaginationItem-root': {
            color: '#EBE5D7',
            fontSize: "14pt",

        },
    },
    filter_dialog:
    {
        '&.MuiDialog-root .MuiDialog-container .MuiPaper-root':
        {
            background: "#333333"
        }
    },
    desktop_date_picker_dark:
    {
        '& .Mui-Paper-root':
        {
            background: "red"
        }
    },
    dialog_button:
    {
        color: "#EBE5D7",
        fontSize: "12pt"
    },
    filter_dialog_title:
    {
        color: "#EBE5D7",
        fontSize: "12pt"
    },
    show_filter_button:
    {
        marginRight: "12px",
        color: "#EBE5D7",
        fontSize: "12pt"
    },
    dialog_select:
    {
        marginBottom: "12px"
    },
    player_search_container:
    {
        display: "flex",
        maxWidth: "100%",
        width: "100%",
        marginRight: "12px",
        [theme.breakpoints.down('xs')]:
        {
            marginRight: "0px",
            marginBottom: "12px"
        }
    }


}))



export default function RatingPage() {


    const [usersPage, setUsersPage] = useState(1);
    const [users, setUsers] = useState(null);
    const [countPerPageUsers, setCountPerPageUsers] = useState(10);
    const [usersSearchString, setUsersSearchString] = useState("");

    const handleUsersPageChange = async (event, value) => {
        setUsersPage(value);
        var data = await DataAccessService.getUserRatingsBySearchString(usersSearchString, value - 1, countPerPageUsers)
        setUsers(data);
    };

    const handlePageCountUsersSelectChange = async (value) => {
        setCountPerPageUsers(value);
        var data = await DataAccessService.getUserRatingsBySearchString(usersSearchString, usersPage - 1, value);
        setUsersPage(1);
        setUsers(data);

    }


    const styles = useStyles();
    useEffect(() => {

        async function fetchUsers() {

            const usersData = await DataAccessService.getUserRatingsBySearchString(usersSearchString, usersPage - 1, countPerPageUsers);
            setUsers(usersData);
            console.log(usersData);

        }
        fetchUsers();


    }, []);

    return (

        <Container maxWidth="lg">


            <div className={styles.h1 + " " + styles.text_light}>Общий рейтинг</div>

            <div className={styles.user_filter_container}>
                <div className={styles.player_search_container}>
                    <TextField value={usersSearchString} onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            DataAccessService.getUserRatingsBySearchString(usersSearchString, usersPage - 1, countPerPageUsers)
                                .then((result) => setUsers(result))
                                .catch((error) => console.log(error));
                        }
                    }} sx={{

                        '& .MuiInputBase-input': {
                            color: "#EBE5D7"
                        },
                        '& .MuiSvgIcon-root ':
                        {
                            color: "#EBE5D7"
                        },
                        '& .MuiInputLabel-root ':
                        {
                            color: "#EBE5D7"
                        },
                        '& .MuiInputLabel-root.Mui-focused ':
                        {
                            color: "#EBE5D7"
                        },
                        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: "#EBE5D7"
                        },
                    }} onChange={(event) => {
                        setUsersSearchString(event.target.value);
                    }} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} size='small' fullWidth variant='outlined' label="Поиск по нику"></TextField>

                </div>

                <div className={styles.pagination_count_container}><SelectLabels items={pageValues} value={countPerPageUsers} onChange={handlePageCountUsersSelectChange} label="Показывать по" /></div></div>

            <div>
                {users?.content?.map(userdata =>

                    <UserRatingRow data={userdata} key={userdata.userId} />

                )}
            </div>
            <div className={styles.pagination_container}>
                <Pagination size="large" variant="text" shape="rounded" classes={{ root: styles.root }} boundaryCount={1} siblingCount={0} count={users ? users.totalPages : 0} page={usersPage} onChange={handleUsersPageChange} />
            </div>
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
