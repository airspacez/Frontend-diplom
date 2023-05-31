
import UserSearcCardAdmin from '../components/UserSearchCardAdmin/UserSearchCardAdmin'
import { useState, useEffect, forwardRef } from 'react'
import DataAccessService from '../Services/DataAccessService';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import TextField from "@mui/material/TextField";
import SelectLabels from '../components/Select/Select';
import Pagination from '@material-ui/lab/Pagination';
import { InputAdornment } from '@mui/material';
import SearchIcon from "@material-ui/icons/Search";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import UserEditDialog from '../components/EditDialogs/UserEditDialog';
import AdminPlacePanel from '../components/AdminPlacePanel/AdminPlacePanel';
import AdminClubPanel from '../components/AdminPlacePanel/AdminClubPanel';
import AdminEventPanel from '../components/AdminPlacePanel/AdminEventPanel';
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



export default function AdminPage() {

    const [isEditDialogOpen, setDialogOpen] = useState(false);
    const [currentEditingUserId, setCurrentEditingUserId] = useState();
    const handleClickOpen = (id) => {
        setCurrentEditingUserId(id);
        setDialogOpen(true);

    };

    const handleUserEditDialogClose = () => {
        setDialogOpen(false);
    };



    const [usersPage, setUsersPage] = useState(1);
    const [users, setUsers] = useState(null);
    const [countPerPageUsers, setCountPerPageUsers] = useState(10);
    const [usersSearchString, setUsersSearchString] = useState("");


    const handleUsersPageChange = async (event, value) => {
        setUsersPage(value);
        var data = await DataAccessService.getUsersBySearchString(usersSearchString, value - 1, countPerPageUsers)
        setUsers(data);
    };




    const [tabPage, setTabPage] = useState(0);

    const handleTabPageChange = (event, newValue) => {
        setTabPage(newValue);
        console.log(newValue);
    };






    const handlePageCountUsersSelectChange = async (value) => {
        setCountPerPageUsers(value);
        var data = await DataAccessService.getUsersBySearchString(usersSearchString, usersPage - 1, value);
        setUsersPage(1);
        setUsers(data);

    }


    const handlePlacesPageChange = async (event, value) => {
        setPlacesPage(value);
        var data = await DataAccessService.getGamePlaces(value - 1, countPerPagePlaces)
        setPlaces(data);
        console.log("Places page changed")
    };


    const handlePageCountPlacesSelectChange = async (value) => {
        setCountPerPagePlaces(value);
        var data = await DataAccessService.getGamePlaces(usersPage - 1, value);
        setPlacesPage(1);
        setPlaces(data);
        console.log("Select page changed")
    }


    const styles = useStyles();
    
    useEffect(() => {

        if (tabPage === 0 && !users) {
            async function fetchUsers() {

                const usersData = await DataAccessService.getUsersBySearchString(usersSearchString, usersPage - 1, countPerPageUsers);
                setUsers(usersData);
                console.log(usersData);

            }
            fetchUsers();
        }
        if (tabPage === 1 && !places) {
            async function fetchUsers() {

                const usersData = await DataAccessService.getGamePlaces(placesPage - 1, countPerPagePlaces);
                setPlaces(usersData);
                console.log(usersData);

            }
            fetchUsers();
        }
        if (tabPage === 2 && !clubs) {
            async function fetchUsers() {

                const usersData = await DataAccessService.getClubs();
                setClubs(usersData);
                console.log(usersData);

            }
            fetchUsers();
        }
        if (tabPage === 3 && !events) {
            async function fetchUsers() {

                const usersData = await DataAccessService.getEvents();
                setEvents(usersData);
                console.log(usersData);

            }
            fetchUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabPage]); 

    const handlePlaceEdited = (entityId, data) => {
        console.log(places);
        const index = places.content.findIndex(item => item.id === entityId);
        // Если элемент найден (индекс не равен -1), обновить его свойства
        if (index !== -1) {
            // Обновление свойств элемента
            places.content[index].description = data.description;
            places.content[index].address = data.address;
            places.content[index].city = {id:data.city , name:data.cityName};
        }
    }

    const handleClubEdited = (entityId, data) => {
        console.log(clubs);
        const index = clubs.findIndex(item => item.id === entityId);
        // Если элемент найден (индекс не равен -1), обновить его свойства
        if (index !== -1) {
            // Обновление свойств элемента
            
            clubs[index].clubName = data.clubName;
            clubs[index].city = {id:data.city , name:data.cityName};
        }
    }

    const handleEventEdited = (entityId, data) => {
        console.log(data);
        const index = events.findIndex(item => item.id === entityId);
        // Если элемент найден (индекс не равен -1), обновить его свойства
        
        if (index !== -1) {
            // Обновление свойств элемента
            
            events[index].name = data.name;
            events[index].description = data.description;
            events[index].datetime = data.datetime;
            console.log(events[index]);
        }
    }

    const handlePlaceDeleted = (entityId) => {
        console.log(places);
        const index = places.content.findIndex(item => item.id === entityId);
        // Если элемент найден (индекс не равен -1), обновить его свойства
        if (index !== -1) {
            places.content.splice(index, 1);
        }
    }

    const handleClubDeleted = (entityId) => {
        console.log(clubs);
        const index = clubs.findIndex(item => item.id === entityId);
        // Если элемент найден (индекс не равен -1), обновить его свойства
        if (index !== -1) {
            clubs.splice(index, 1);
        }
    }

    const handleEventDeleted = (entityId) => {
       
        const index = events.findIndex(item => item.id === entityId);
        // Если элемент найден (индекс не равен -1), обновить его свойства
        if (index !== -1) {
            events.splice(index, 1);
        }
    }

    const handleClubAdd = (data) => {
        console.log(clubs);
        console.log(data);

        clubs.unshift({
            id:data.id,
            clubName:data.clubName,
            city:{id:data.city, name:data.cityName}
        });
    }

    const handleEventAdd = (data) => {
        
        console.log(data);

        events.unshift({
            id:data.id,
            name:data.name,
            place:data.placeName,
            description:data.description,
            datetime:data.datetime
        });
    }


    const [placesPage, setPlacesPage] = useState(1);
    const [places, setPlaces] = useState(null);
    const [countPerPagePlaces, setCountPerPagePlaces] = useState(10);

    const [clubs, setClubs] = useState(null);
    const [events, setEvents] = useState(null);


    return (
        <Container maxWidth="lg">
            <Tabs value={tabPage} onChange={handleTabPageChange} centered>
                <Tab label="Игроки" />
                <Tab label="Места" />
                <Tab label="Клубы" />
                <Tab label="Мероприятия"/>
            </Tabs>
            {tabPage === 0 &&
                <>
                    <div className={styles.user_filter_container}>
                        <div className={styles.player_search_container}>
                            <TextField value={usersSearchString} onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    DataAccessService.getUsersBySearchString(usersSearchString, usersPage - 1, countPerPageUsers)
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
                            <UserSearcCardAdmin data={userdata} key={userdata.id} onEditClick={handleClickOpen} />
                        )}
                    </div>
                    <div className={styles.pagination_container}>
                        <Pagination size="large" variant="text" shape="rounded" classes={{ root: styles.root }} boundaryCount={1} siblingCount={0} count={users ? users.totalPages : 0} page={usersPage} onChange={handleUsersPageChange} />
                    </div>
                    <UserEditDialog open={isEditDialogOpen} entityId={currentEditingUserId} onClose={handleUserEditDialogClose} />
                </>}

            {tabPage === 1 &&
                <AdminPlacePanel
                    onPlaceDeleted={handlePlaceDeleted}
                    onPlaceEdited={handlePlaceEdited}
                    countPerPagePlaces={countPerPagePlaces}
                    onPageChange={handlePlacesPageChange}
                    onCountPerPageChange={handlePageCountPlacesSelectChange}
                    currentPage={placesPage}
                    data={places}
                />}
                {tabPage === 2 &&
                <AdminClubPanel
                    onAdd={handleClubAdd}
                    onPlaceDeleted={handleClubDeleted}
                    onPlaceEdited={handleClubEdited}
                    countPerPagePlaces={countPerPagePlaces}
                    onPageChange={handlePlacesPageChange}
                    onCountPerPageChange={handlePageCountPlacesSelectChange}
                    currentPage={placesPage}
                    data={clubs}
                />}
                 {tabPage === 3 &&
                <AdminEventPanel
                    onAdd={handleEventAdd}
                    onPlaceDeleted={handleEventDeleted}
                    onEventEdited={handleEventEdited}
                    currentPage={placesPage}
                    data={events}
                />}
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

