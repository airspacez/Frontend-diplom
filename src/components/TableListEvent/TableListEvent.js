
import SelectLabels from "../Select/Select";
import UserSearchResultCard from "../UserSearchResultCard/UserSearchResultCard";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button'
import { useState } from "react";
import DataAccessService from '../../Services/DataAccessService'
const useStyles = makeStyles((theme) => ({
    root:
    {
        marginBottom: "24px",
        background: "#EBE5D7",
        '&.MuiCard-root':
        {
            height: "fit-content",
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: "5px",

        },

    },
    profile_container:
    {
        textTransform: "uppercase",
        boxSizing: "border-box",
        marginTop: "12px",
        borderRadius: "12px",
        background: "#EBE5D7",
        width: "100%",
        padding: "32px",
        height: "fit-content",

        display: "flex",
        [theme.breakpoints.down('xs')]: {

            flexDirection: "column",

        },
        [theme.breakpoints.down('sm')]: {
            padding: "0px",
        },

    },
    profile_image_container:
    {

        marginBottom: "20px",
        width: "192px",
        height: "256px",
        objectFit: "cover",
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            margin: "0 auto",
            marginBottom: "20px",
            width: "192px",
            height: "256px",


        },

        [theme.breakpoints.down('xs')]: {


            height: "100%",
        },


    },
    profile_image:
    {
        display: "block",
        height: "100%",
        width: "inherit",
        objectFit: "cover",
        borderRadius: "8px",
    },
    profile_data: {


        fontFamily: "'Roboto', sans-serif",
        fontSize: "14pt",
        fontWeight: "600",
        marginBottom: "16px",
        height: "fit-content",
        textAlign: "left"

    },
    profile_name_text: {
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "500",
        fontSize: "28pt",
        lineHeight: "1em",


    },
    profile_info_container:
    {
        display: "flex",
        [theme.breakpoints.down('sm')]: {

            flexDirection: "column",
            width: "100%",
        },
    },
    profile_info:
    {
        marginLeft: "32px",
        [theme.breakpoints.down('xs')]: {
            marginLeft: "0px",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            paddingTop: "10px"
        },
    },
    profile_info_primary:
    {


        display: "flex",
        flexDirection: "column"
    },
    profile_data_name:
    {
        textAlign: "left",
        marginBottom: "16px",
        width: "100%"
    },
    profile_info_secondary:
    {
        marginLeft: "32px",
        [theme.breakpoints.down('sm')]: {

            marginLeft: "0px",
        },

    },
    data:
    {
        display: "inline-block"

    },
    email:
    {
        textTransform: "none",
        wordBreak: "break-all"
    },
    statistics_container:
    {

        marginTop: "64px",
        marginBottom: "64px"

    },
    h1:
    {
        marginBottom: "32px",
        textAlign: "left",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "28pt",
        lineHeight: "1em",
        textTransform: "uppercase",
        [theme.breakpoints.down('xs')]: {
            marginBottom: "32px"
        },
    },
    text_light:
    {
        color: "#EBE5D7"
    },
    stats:
    {

        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(200px, 1fr))",
        justifyItems: "center",


    },
    stat_item:
    {
        marginTop: "30px",

        width: "fit-content",
        display: "inline-block",
        height: "92px",
        margin: "auto"

    },
    stat_item_name:
    {
        whiteSpace: "nowrap",
        wordWrap: "break-word",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "14pt",
        color: "#EBE5D7",
    },
    stat_item_value:
    {

        fontFamily: "'Oswald', sans-serif",
        color: "#EBE5D7",
        fontSize: "32pt",
        lineHeight: "1.25em"
    },
    winrate_container:
    {
        height: "fit-content",
        [theme.breakpoints.down('xs')]: {
            order: "-1",
            width: "50%",
            margin: "0 auto"
        },

    },
    stats_content:
    {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down('xs')]: {
            flexWrap: "reverse-wrap",
            flexDirection: "column",
            justifyContent: "center"
        },
    },
    data_prefix:
    {
        fontSize: "11pt",
        display: "block"
    },
    games_container:
    {
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",

    },
    game_item:
    {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "'Roboto', sans-serif",
        textTransform: "uppercase",

        [theme.breakpoints.down('xs')]: {

            flexDirection: "column",

        },
    },
    game_data:
    {
        fontSize: "14pt",
        fontWeight: "600",
        height: "fit-content",
        textAlign: "left",


        marginBottom: "12px"


    },
    game_result_container:
    {
        display: "flex",

        justifyContent: "space-around",
        flexDirection: "column",
        justifySelf: "flex-end",
        marginLeft: "auto",
        alignItems: "end",
        marginRight: "24px",
        [theme.breakpoints.down('sm')]: {
            alignItems: "start",
            width: "100%",
            margin: "0 auto",
            marginBottom: "24px"
        },

    },

    game_details_btn:
    {

        width: '90px'

    },

    game_result_text:
    {
        lineHeight: "1em",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "20pt",
        fontWeight: "500"
    },
    game_data_container:
    {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down('sm')]: {
            flexWrap: "wrap",

            width: "100%",

        },
        [theme.breakpoints.up('sm')]: {

            width: "100%",

        },

    },
    game_data_block:
    {
        marginRight: "36px",

        fontFamily: "'Roboto', sans-serif"

    },
    card_actions:
    {
        justifyContent: "space-between",
        [theme.breakpoints.up("md")]:
        {
            justifyContent: "center"
        }
    }

}))

export default function TableListEvent(props) {
    const {eventId} = props
    const { group } = props;
    const { leads } = props;
    const { onLeadChange } = props;
    const { tableNumber } = props;
    const { onSelectOpen } = props;
    const {outerValue} = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleLeadChange = (value) => {
      
        onLeadChange(value, tableNumber);
        console.log("Значение передано из ListEvent: " + value);
        console.log("Значение получено в прошлый раз:  " + outerValue);
    }

    const handleSelectLeadOpen = () => {
        onSelectOpen();
    }

    const handleConfirmDialogOpen = () =>
    {
        
        setDialogOpen(true);
    }

    const handleConfirmDialogConfirm = async () =>
    {

        
        
        
        var result = await DataAccessService.patchUsersInEventByEventIdAndTableNo(eventId, tableNumber, {leadId:outerValue});
   
        if (result) {
    
                
        }
        setDialogOpen(false);
    }

    const handleConfirmDialogClose = () => 
    {
        setDialogOpen(false);
    }

    return (
        <>
            <div>
                <div key={tableNumber}>
                    <h2>Table Number: {tableNumber}</h2>
                    <h3>LEAD </h3>
                    <div>
                    <SelectLabels label="Ведущий" onOpen={handleSelectLeadOpen} onChange={handleLeadChange} value={outerValue} items={leads} />
                    <Button  style={{color:"#EBE5D7"}} onClick={handleConfirmDialogOpen}>Назначить</Button> 

               </div>
                    {group?.map(member => (
                        <UserSearchResultCard
                            data={member.user[0]}
                            key={member.user[0].id}
                        />
                    ))}
                </div>
            </div>
            <ConfirmDialog open={dialogOpen} OkTitle={"Да"} CancelTitle={"Нет"} onCancel={handleConfirmDialogClose} onConfirm={handleConfirmDialogConfirm} title="Ведущий"
                        info="Назначить ведущего?"
                    /></>
    );
}