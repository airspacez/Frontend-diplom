import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import DataAccessService from "../Services/DataAccessService";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container"
import { parseISO, format } from 'date-fns';
import UserSearchResultCard from "../components/UserSearchResultCard/UserSearchResultCard";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import AuthenticationService from "../Services/AuthService";
import Button from "@mui/material/Button"
import GameMemberForm from "../components/GameMemberForm/GameMemberForm";
import TableListEvent from "../components/TableListEvent/TableListEvent";
import { convertUsersForSelectComponent } from "../Utils/DataConverterUtils";
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
    description_text:
    {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "16pt",
        textAlign: "justify",
    },
    text_light:
    {
        color: "#EBE5D7"
    },
    members_container:
    {
        justifyContent: "space-evenly",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    game_lead_container:
    {
        display: "flex",
        justifyContent: "center"
    },
    game_data_container:
    {

        boxSizing: "border-box",
        width: "100%",
        height: "fit-content",
        background: "#EBE5D7",
        padding: "16px",
        borderRadius: "4px",
        display: "flex",
        flexWrap: "wrap",
        [theme.breakpoints.down('sm')]: {
            order: "-1",
            marginBottom: "24px"
        },
    },
    margin_right:
    {
        marginRight: "12px",
    },
    game_data_wrapper:
    {
        marginBottom: "32px",
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
            marginBottom: "0px",
        },

    },
    main_data_event:
    {
        maxWidth: "350px",
        [theme.breakpoints.down('xs')]: {
            maxWidth: "100%",
        },

    },
    game_info_main:
    {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "100%",
        width: "fit-content",

        marginRight: "12px",
        marginBottom: "20px",
        '&:last-child': {
            marginBottom: '0px',
        },
    },
    property_name:
    {
        textAlign: "left",
        textTransform: "uppercase",
        fontSize: "11pt",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "600",
    },
    property_value:
    {
        textAlign: "left",
        textTransform: "uppercase",
        fontSize: "16pt",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "500",
    },
    game_info_secondary:
    {
        display: "flex",
        flexDirection: "column",
        marginRight: "12px",
        '&:not(:last-child)': {
            marginBottom: '20px',
        },
    },
    event_actions_container:
    {
        flexWrap: "wrap",
        display: "flex",
        alignItems: 'start',
        width: "100%",
    },
    checkbox_panel:
    {
        background: "#EBE5D7",
        padding: "4px 16px",
        width: "fit-content",
        borderRadius: "4px",
        marginBottom: "24px"
    }

}));

export default function Event_Page() {
    const [eventDetails, setEventDetails] = useState([]);
    const styles = useStyles();
    const { eventId } = useParams();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [confirmDialiogOpen, setConfirmDialogOpen] = useState(false);
    const [unsubscribeDialogOpen, setUnsubscribeDialogOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [currentLoggedUserData, setCurrentLoggedUserData] = useState();
    const [userRole, setUserRole] = useState();
    const [mapByTablesIfDistributed, setMapByTablesIfDistributed] = useState();
    const [leads, setLeads] = useState();

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchEventDetails() {
            const data = await DataAccessService.getEventById(eventId, abortController.signal);
            const isUserRegistered = await DataAccessService.isLoggedUserRegisteredInEventById(eventId, abortController.signal);
            const currentUserData = await AuthenticationService.getCurrentLoggedUserSimpleData(abortController.signal);
            const userRole = await AuthenticationService.getUserRole();
            console.log(userRole);
            setUserRole(userRole);
            setCurrentLoggedUserData(currentUserData);
            setEventDetails(data);
            console.log(data.distributed);
            
            setIsChecked(isUserRegistered);
            console.log(data);
            const date = parseISO(data.datetime);
            const timeZoneOffset = 10 * 60; // Смещение часового пояса в минутах (+10:00)
            const timeZoneDate = new Date(date.getTime() + timeZoneOffset);
            const dateString = format(timeZoneDate, 'dd.MM.yyyy');
            const timeString = format(timeZoneDate, 'HH:mm');
            setDate(dateString);
            setTime(timeString);
        }
        fetchEventDetails();

        return () => {
            // Отмена запроса при размонтировании компонента или изменении зависимостей
            abortController.abort();
        };
    }, []);


    useEffect(() => {


        if (eventDetails?.distributed === true) {
            const groupedByTableNumber = eventDetails?.usersInEvent?.reduce((acc, member) => {
                if (member?.appeared) {
                    const tableNumber = member.tableNumber;

                    if (!acc[tableNumber]) {
                        acc[tableNumber] = [];
                    }

                    acc[tableNumber].push(member);
                }

                return acc;
            }, {});
            const groupedByTableNumberArray = Object.values(groupedByTableNumber);
            setMapByTablesIfDistributed(groupedByTableNumberArray);

        }


    }, [eventDetails?.distributed]);




    const handleConfirmDialogConfirm = async () => {

        var result = await DataAccessService.postUserInEvent(currentLoggedUserData?.id, eventId, { appeared: false });
        if (result) {
            setConfirmDialogOpen(false);
            setIsChecked(true);
            eventDetails.usersInEvent.unshift({
                user: [{
                    id: currentLoggedUserData?.id,
                    name: currentLoggedUserData?.name,
                    nickname: currentLoggedUserData?.nickname,
                    altNickname: currentLoggedUserData?.altNickname
                }]
            });
        }
    }




    const handleUnsubscribeDialogConfirm = async () => {
        var result = await DataAccessService.deleteUserInEvent(currentLoggedUserData?.id, eventId);
        if (result) {
            setUnsubscribeDialogOpen(false);
            setIsChecked(false);
            var index = eventDetails.usersInEvent.findIndex(item => item.user[0].id === currentLoggedUserData?.id);
            if (index !== -1) {
                eventDetails.usersInEvent.splice(index, 1);
            }
        }
    }

    const handleUnsubscribeDialogClose = () => {
        setUnsubscribeDialogOpen(false);
    }

    const handleConfirmDialogClose = () => {
        setConfirmDialogOpen(false);
    }

    const handleClick = () => {
        isChecked ? setUnsubscribeDialogOpen(true) : setConfirmDialogOpen(true);

    }

    const handleUserCardChecked = (userId, value) => {
        console.log("checked:" + userId + " " + value);
    }

    const handleCheckedChange = () => { }

    
    const handleSelectOpen = async () => 
    {
        if (!leads)
        {
            var data = await DataAccessService.getLeads();
            
            setLeads(convertUsersForSelectComponent(data));
            
        }
        console.log(leads);
    }

    const handleLeadChange = (value, tableNumber) => 
    {
        console.log(mapByTablesIfDistributed);
        console.log(tableNumber);
        
        var index = mapByTablesIfDistributed.findIndex(group => group[0].tableNumber === parseInt(tableNumber));
        

        if (index != -1)
         {
            const newArray = mapByTablesIfDistributed.map(subArray => [...subArray]);
         
            newArray[index].map(element => {element.leadId = value;  console.log(element)});
            console.log(newArray);
           setMapByTablesIfDistributed(newArray);
        }
       
        
    }
  
    if (eventId !== "") {
        return (

            <Container maxWidth="lg">
                <>
                    <div className={styles.h1 + " " + styles.text_light}>Детали мероприятия</div>
                    <div className={styles.game_data_wrapper}>

                        <div className={styles.game_data_container + " " + styles.margin_right + " " + styles.main_data_event}>
                            <div className={styles.game_info_secondary}>
                                <div className={styles.game_info_main}>
                                    <div className={styles.property_name}>название мероприятия</div>
                                    <div className={styles.property_value}>{eventDetails?.name}</div>
                                </div>
                                <div className={styles.game_info_main}>
                                    <div className={styles.property_name}>место</div>
                                    <div className={styles.property_value}>{eventDetails?.place?.description + ", " +
                                        eventDetails?.place?.address + ", " + eventDetails?.place?.city?.name
                                    }</div>
                                </div>
                                <div className={styles.game_info_main}>
                                    <div className={styles.property_name}>дата</div>
                                    <div className={styles.property_value}>{date ? date : "NULL"}</div>
                                </div>
                                <div className={styles.game_info_main}>
                                    <div className={styles.property_name}>время</div>
                                    <div className={styles.property_value}>{time ? time + " (GMT+10)" : "NULL"}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.game_data_container}>

                            <div>
                                <div className={styles.property_name}>описание мероприятия</div>
                                <br />
                                <div className={styles.description_text}>
                                    {eventDetails?.description}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.h1 + " " + styles.text_light}>Участники</div>
                    {!(eventDetails?.distributed) && (<>

                        <div className={styles.event_actions_container}>
                            <div className={styles.checkbox_panel}>
                                <FormControlLabel onClick={handleClick} sx={{ color: '#333333' }} control={<Checkbox checked={isChecked} onChange={handleCheckedChange}
                                    sx={{
                                        color: '#b80000', '&.Mui-checked': {
                                            color: '#b80000', // Задайте нужный цвет для активного состояния
                                        },
                                    }}

                                > </Checkbox>} label={<span style={{ fontFamily: "'Roboto', sans-serif", fontSize: "12pt", fontWeight: "600" }}>БУДУ УЧАСТВОВАТЬ</span>} />
                            </div>
                        </div>

                        <div className={styles.members_container}>
                            {eventDetails?.usersInEvent?.map(member => (
                                <UserSearchResultCard isForEvent onChecked={handleUserCardChecked} userRole={userRole?.description} data={member.user[0]} key={member.user[0].id} />
                            ))}
                        </div></>)}

                    {(eventDetails?.distributed) && (mapByTablesIfDistributed) && (<>
                        
                        <div>
                            {(mapByTablesIfDistributed)?.map(element => (
                                <TableListEvent onSelectOpen={handleSelectOpen} eventId={eventId} key={element} onLeadChange={handleLeadChange} outerValue={element[0].leadId} tableNumber={element[0].tableNumber} group={element} leads={leads}></TableListEvent>
                            ))}
                        </div></>)} 







                    {userRole?.description === "ROLE_ADMIN" && (<div className={styles.event_start_button_container}>
                        <Button variant="contained">Начать мероприятие</Button>
                    </div>)}
                    <ConfirmDialog open={confirmDialiogOpen} OkTitle={"Да"} CancelTitle={"Нет"} onCancel={handleConfirmDialogClose} onConfirm={handleConfirmDialogConfirm} title="Участие в мероприятии"
                        info="Вы действительно хотите участвовать в данном мероприятии?
                                        Участие можно отменить в любой момент."
                    />
                    <ConfirmDialog open={unsubscribeDialogOpen} OkTitle={"Да"} CancelTitle={"Нет"} onCancel={handleUnsubscribeDialogClose} onConfirm={handleUnsubscribeDialogConfirm} title="Участие в мероприятии"
                        info="Отписаться от мероприятия?"
                    /></>
                
                {eventDetails?.state === "Начато" && userRole?.description === "ROLE_LEAD" && (
                    <>
                        <div>Мероприятие уже начато</div>
                        <div>
                            <GameMemberForm />
                            <GameMemberForm />
                            <GameMemberForm />
                            <GameMemberForm />
                            <GameMemberForm />
                        </div>
                    </>
                )}



            </Container>

        )
    }
    else {
        return (<>NO SUCH EVENT</>);
    }
}
