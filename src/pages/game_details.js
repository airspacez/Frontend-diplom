import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import DataAccessService from "../Services/DataAccessService";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container"
import GameMember from "../components/GameMember/GameMember";
import GameLead from "../components/GameLead/GameLead"
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
      display:"flex",
      justifyContent:"center"  
    },
    game_data_container:
    {   
        boxSizing:"border-box",
        width:"100%",
        height:"fit-content",
        background:"#EBE5D7",
        padding:"16px",
        borderRadius:"12px",
        display:"flex",
        flexWrap:"wrap",
        [theme.breakpoints.down('xs')]: {
            order:"-1",
            marginBottom:"24px"
        },
    },
    game_data_wrapper:
    {
        marginBottom:"32px",
        display:"flex",
        flexDirection:"row",
        [theme.breakpoints.down('xs')]: {
            flexDirection:"column",
            marginBottom:"0px",
        },
       
    },
    
     game_info_main:
    {
        display:"flex",
        flexDirection:"column",
        alignItems:"start",
        height:"100%",
        width:"fit-content",
      
        marginRight:"12px",
        marginBottom:"20px",
        '&:last-child': {
            marginBottom: '0px',
          },
    },
    property_name:
    {
        textTransform:"uppercase",
        fontSize: "11pt",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "600",
    },
    property_value:
    {
        textTransform:"uppercase",
        fontSize: "16pt",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "500",
    },
    game_info_secondary:
    {
        display:"flex",
        flexDirection:"column",
        marginRight:"12px",
        '&:not(:last-child)': {
            marginBottom: '20px',
          },
    }

}));

export default function GameDetails() {
    const [gameDetails, setGameDetails] = useState([]);
    const styles = useStyles();
    const { gameId } = useParams();

    useEffect(() => {
        async function fetchGameDetails() {
            const stats = await DataAccessService.getGameDetailsById(gameId);
            setGameDetails(stats);
            console.log(stats);
            setGameDetails(stats);
            const dateObj = new Date(stats?.date);
            const options = { day: 'numeric', month: 'long', year:'numeric' };
            const formattedDate = dateObj.toLocaleDateString('ru-RU', options);
            stats.date = formattedDate;
        }
        fetchGameDetails();
    }, []);


    if (gameId !== "") {
        return (

            <Container maxWidth="lg">
                <div className={styles.h1 + " " + styles.text_light}>Детали игры</div>
                    <div className={styles.game_data_wrapper}>
                    <div className={styles.game_lead_container}><GameLead data={gameDetails.lead}/></div>
                        <div className={styles.game_data_container}>
                        <div className={styles.game_info_secondary}>
                            <div className={styles.game_info_main}>
                                <div className={styles.property_name}>тип игры</div>
                                <div className={styles.property_value}>{gameDetails && gameDetails.type ? gameDetails.type.description : ""}</div>
                            </div>
                            <div className={styles.game_info_main}>
                                <div className={styles.property_name}>исход</div>
                                <div className={styles.property_value}>{gameDetails && gameDetails.result ? gameDetails.result.description : ""}</div>
                            </div>
                            </div>
                            <div className={styles.game_info_secondary}>
                            <div className={styles.game_info_main}>
                                <div className={styles.property_name}>место проведения</div>
                                <div className={styles.property_value}>{gameDetails && gameDetails.place ? gameDetails.place.description : ""}</div>
                            </div>
                            <div className={styles.game_info_main}>
                                <div className={styles.property_name}>стол</div>
                                <div className={styles.property_value}>{gameDetails ? gameDetails.table : ""}</div>
                            </div>
                            </div>
                            <div className={styles.game_info_secondary}>
                            <div className={styles.game_info_main}>
                                <div className={styles.property_name}>дата проверения</div>
                                <div className={styles.property_value}>{gameDetails ? gameDetails.date : ""}</div>
                            </div>
                            <div className={styles.game_info_main}>
                                <div className={styles.property_name}>номер игры</div>
                                <div className={styles.property_value}>{gameDetails ? gameDetails.gameNumber : ""}</div>
                            </div>
                            </div>
                            

                            
                        </div>
                        
                    </div>
                    <div className={styles.h1 + " " + styles.text_light}>Участники</div>
                <div className={styles.members_container}>
                {gameDetails?.members?.map(member => (
                        <GameMember data={member} key={member.id.userId} />
                    ))}

                </div>


            </Container>
        )
    }
    else {
        return (<>NO SUCH GAME</>);
    }
}
