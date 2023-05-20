import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import placeholder from "./../../media/images/placeholder_2.jpg"



const useStyles = makeStyles((theme) => ({
    h1:
    {
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
        justifyContent: "center",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    member_container:
    {

        display: "flex",
        marginBottom: "24px",
        marginLeft: "6px",
        marginRight: "6px",
        height: "340px",
        

    },
    member_card:
    {
        cursor:"pointer",
        maxWidth:"220px",
        width: "100%",
        height: "340px", 
        background: "#EBE5D7",
        borderRadius: "12px",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        transition: "transform 0.05s ease-out, box-shadow 0.05s ease-out",
        '&:hover':
        {
            transform: " scale(1.05)",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)"
        }
    },
    member_image_container:
    {
        position:"relative",
        boxSizing: "border-box",
        padding: "12px",
        width: "100%",
        height: "80%",

    },
    member_image:
    {
        boxSizing:"border-box",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        border:"1px solid black"
    },
    member_desc:
    {

        display: "flex",
        flexDirection: "column",
        textTransform: "uppercase",
        padding: "0 12px"
    },
    member_nickname:
    {
        fontSize: "16pt",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "600",
        
    },
    ellipsis:
    {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

    },
    member_role_name:
    {
        fontSize: "11pt",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "600",
        marginBottom: "4px"
    },
    member_image_position:
    {
        fontSize: "14pt",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "600",
        width:"30px",
        height:"30px",
        position: "absolute", 
        bottom: "0", 
        right: "0", 
        backgroundColor: "#EBE5D7",
        color: "#000", 
        borderRadius: "50%", 
        lineHeight:"30px",
        margin:"16px",
    },
    member_gamestats:
    {   
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        boxSizing:"border-box",
        paddingLeft:"16px",
    },
    stats_item:
    {
        margin:"12px 0",
        display:"flex",
        textTransform:"uppercase",
        color:"#EBE5D7",
        flexDirection:"column",
        alignItems:"start"
    },
    stat_name:
    {
        fontSize: "12pt",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "500",
        textAlign:"left"
    },
    stat_value:
    {
        textAlign:"left",
        fontSize: "18pt",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "600",
        lineHeight:"1.1"
    }

}));

export default function GameMember(props)
{
    const navigate = useNavigate();
    function HandleProfileBtnClick(id)
    {
        navigate(`/profile/${id}`)
    }
    const { data } = props;
    const styles = useStyles();
    return(
        <div className={styles.member_container}>
        <div className={styles.member_card} onClick={()=>{HandleProfileBtnClick(data.id.userId)}}>
            <div className={styles.member_image_container}><img src={placeholder} className={styles.member_image}></img>
                <div className={styles.member_image_position}>
                {data  ? data.positionInGame : ""}
                </div>
            </div>
            <div className={styles.member_desc}>
                <div className={styles.member_role_name}>{data && data.role ? data.role.name : ""}</div>
                <div className={styles.ellipsis + " " + styles.member_nickname} >{data && data.user ? data.user.nickname : ""}</div>
            </div>
        </div>
        <div className={styles.member_gamestats}>
            <div className={styles.stats_item}>
                <div className={styles.stat_name}>Очки</div>
                <div className={styles.stat_value}>{data ? data.penalty + data.extraPoints + data.bm_Compensation + data.bm_3Red + data.bm_3Black + data.bm_2Black : ""}</div>
            </div>
            <div className={styles.stats_item}>
                <div className={styles.stat_name}>доп. балл</div>
                <div className={styles.stat_value}>{data ? data.extraPoints : ""}</div>
            </div>
            <div className={styles.stats_item}>
                <div className={styles.stat_name}>штраф</div>
                <div className={styles.stat_value}>{data ? data.penalty : ""}</div>
            </div>
            <div className={styles.stats_item}>
                <div className={styles.stat_name}>фолы</div>
                <div className={styles.stat_value}>{data ? data.fouls : ""}</div>
            </div>
        </div>
    </div>
    )
}