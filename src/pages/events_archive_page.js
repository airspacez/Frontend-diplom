import { useState, useEffect } from 'react'
import DataAccessService from '../Services/DataAccessService';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import EventCard from "../components/EventCard/EventCard"
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



export default function EventsArchivePage() {

   
    const [events, setEvents] = useState(null);
   




    const styles = useStyles();
    useEffect(() => {
   
        async function fetchStatistics() {

            const data = await DataAccessService.getEvents();
            setEvents(data);
       

        }
        fetchStatistics();

    }, []);

    return (
          <Container>qwe
            <div className={styles.h1 + " " + styles.text_light}>Мероприятия</div>
            <div className={styles.games_list}>
                {events?.map(event => (
                    <EventCard data={event} key={event.id} />
                ))}
            
            </div>
        </Container>

    )
}
