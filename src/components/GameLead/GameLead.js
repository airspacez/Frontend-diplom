import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import placeholder from "./../../media/images/placeholder_2.jpg"



const useStyles = makeStyles((theme) => ({
    
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
        transition: "transform 0.05s ease-out, box-shadow 0.05s ease-out",
        '&:hover':
        {
            transform: " scale(1.05)",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)"
        },
        maxWidth:"220px",
        width: "220px",
        height: "340px", 
        background: "#484646",
        borderRadius: "12px",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
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
        border:"1px solid black",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"

    },
    member_desc:
    {

        display: "flex",
        flexDirection: "column",
        textTransform: "uppercase",
        padding: "0 12px",
        color:"#EBE5D7"
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
        backgroundColor: "#484646",
        
        color:"#EBE5D7", 
        borderRadius: "50%", 
        lineHeight:"30px",
        margin:"16px",
        border:"1px solid black",
        
    },
 
}));

export default function GameLead(props)
{
    const navigate = useNavigate();
    function HandleProfileBtnClick(id)
    {
        navigate(`/profile/${id}`)
    }
    const { data } = props;
    const styles = useStyles();
    return(
        <div className={styles.member_container} onClick={()=>{HandleProfileBtnClick(data.id)}}>
        <div className={styles.member_card}>
            <div className={styles.member_image_container}><img src={placeholder} className={styles.member_image}></img>
                <div className={styles.member_image_position}>
                    В
                </div>
            </div>
            <div className={styles.member_desc}>
                <div className={styles.member_role_name}>Ведущий</div>
                <div className={styles.ellipsis + " " + styles.member_nickname}>{data ? data.nickname : ""}</div>
            </div>
        </div>
    </div>
    )
}