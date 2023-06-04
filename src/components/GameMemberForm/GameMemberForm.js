import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import placeholder from "./../../media/images/placeholder_2.jpg"
import ListItem from '@mui/material/ListItem';
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SelectLabels from '../Select/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox'
const useStyles = makeStyles((theme) => ({
    h1:
    {
        marginBottom: "12px",
        textAlign: "left",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "28pt",
        lineHeight: "1em",
        textTransform: "uppercase",
        display: "inline",
        color: "#EBE5D7"
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
        width: "100%",
        flexDirection: "column",

    },
    member_card:
    {
        cursor: "pointer",
        maxWidth: "220px",
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
        position: "relative",
        boxSizing: "border-box",
        padding: "12px",
        width: "100%",
        height: "80%",

    },
    member_image:
    {
        boxSizing: "border-box",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        border: "1px solid black"
    },
    nickname:
    {
        display: "flex",
        flexDirection: "row"
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
        width: "30px",
        height: "30px",
        position: "absolute",
        bottom: "0",
        right: "0",
        backgroundColor: "#EBE5D7",
        color: "#000",
        borderRadius: "50%",
        lineHeight: "30px",
        margin: "16px",
    },
    member_gamestats:
    {
        height: "100%",
        display: "flex",
        flexDirection: "row",

        boxSizing: "border-box",

    },
    stats_item:
    {
        margin: "12px 0",
        display: "flex",
        textTransform: "uppercase",
        color: "#EBE5D7",
        flexDirection: "column",
        alignItems: "start"
    },
    stat_name:
    {
        fontSize: "12pt",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "500",
        textAlign: "left"
    },
    stat_value:
    {
        textAlign: "left",
        fontSize: "18pt",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "600",
        lineHeight: "1.1"
    },
    inline_block:
    {
        marginRight:"16px"
    },
    margin_left:
    {
        marginLeft:"12px"
    }

}));

export default function GameMemberForm(props) {
    const {data} = props;
    
    const [checked, setChecked] = useState(false);
    const [compensation, setCompensation] = useState(0);
    const [extra, setExtra] = useState(0);
    const [penalty, setPenalty] = useState(0);
    const [fouls, setFouls] = useState(0);

    const [roleValue, setRoleValue] = useState(1);
    const [statement, setStatement] = useState(0);
    const styles = useStyles();

    const handleCompensationChange = (event) =>
    {
        setCompensation(event.target.value);
    } 

    const handleExtraChange = (event) =>
    {
        setExtra(event.target.value);
    } 


    const handlePenaltyChange = (event) =>
    {
        setPenalty(event.target.value);
    } 

    const handleFoulsChange = (event) =>
    {
        setFouls(event.target.value);
    } 

    const handleCheckedChange = (event) =>
    {
        setChecked(event.target.checked);
    }

    const handleRoleChange = (value) =>
    {
        setRoleValue(value);
    }

    const handleStatementChange = (value) =>
    {
        setStatement(value);
    }



    return (
        <Card sx={{ marginBottom: "16px", background: checked ? "#484848" : "#333333"}}>
            <CardContent>
                <div className={styles.member_container}>
                    <div className={styles.nickname}><div className={styles.h1 + " " + styles.inline_block}>Никнейм</div>
                    <FormControlLabel sx={{color:'#EBE5D7'}} control={<Checkbox 
                                sx={{color:'#EBE5D7', '&.Mui-checked': {
                                    color: '#EBE5D7', // Задайте нужный цвет для активного состояния
                                  },}}
                                checked={checked}  onChange={handleCheckedChange}></Checkbox>} label={<span style={{fontSize:"14pt"}}>Участвует в игре</span>} /></div>

                    <div className={styles.member_gamestats}>
                        <div>
                            <div className={styles.stats_item}>

                                <TextField required
                                    disabled={!checked}
                                    value={compensation}
                                    label="Компенсация"
                                    type="number"
                                    onChange={handleCompensationChange}
                                    InputLabelProps={
                                        {
                                            shrink: true,
                                            sx: {
                                                color: "#EBE5D7",
                                                '&.Mui-focused':
                                                {
                                                    color: "#EBE5D7",
                                                }
                                            }
                                        }
                                    }
                                    InputProps={{
                                        sx: {
                                            '& .MuiInputBase-input':
                                            {
                                                color: "#EBE5D7",
                                                fontSize: "14pt",

                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                            {
                                                borderColor: "#EBE5D7",
                                            }
                                        },
                                    }}

                                />

                            </div>
                            <div className={styles.stats_item}>
                                <TextField required
                                    label="Дополнительный балл"
                                    type="number"
                                    value={extra}
                                    onChange={handleExtraChange}
                                    disabled={!checked}
                                    InputLabelProps={
                                        {
                                            shrink: true,
                                            sx: {
                                                color: "#EBE5D7",
                                                '&.Mui-focused':
                                                {
                                                    color: "#EBE5D7",
                                                }
                                            }
                                        }
                                    }
                                    InputProps={{
                                        sx: {
                                            '& .MuiInputBase-input':
                                            {
                                                color: "#EBE5D7",
                                                fontSize: "14pt",

                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                            {
                                                borderColor: "#EBE5D7",
                                            }
                                        },
                                    }}

                                />
                            </div>
                            <div className={styles.stats_item}>
                                <TextField required
                                    label="Штраф"
                                    type="number"
                                    value={penalty}
                                    disabled={!checked}
                                    onChange={handlePenaltyChange}
                                    InputLabelProps={
                                        {
                                            shrink: true,
                                            sx: {
                                                color: "#EBE5D7",
                                                '&.Mui-focused':
                                                {
                                                    color: "#EBE5D7",
                                                }
                                            }
                                        }
                                    }
                                    InputProps={{
                                        sx: {
                                            '& .MuiInputBase-input':
                                            {
                                                color: "#EBE5D7",
                                                fontSize: "14pt",

                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                            {
                                                borderColor: "#EBE5D7",
                                            }
                                        },
                                    }}

                                />
                            </div>
                            <div className={styles.stats_item}>
                                <TextField required
                                    label="Фолы"
                                    type="number"
                                    value={fouls}
                                    onChange={handleFoulsChange}
                                    disabled={!checked}
                                    InputLabelProps={
                                        {
                                            shrink: true,
                                            sx: {
                                                color: "#EBE5D7",
                                                '&.Mui-focused':
                                                {
                                                    color: "#EBE5D7",
                                                }
                                            }
                                        }
                                    }
                                    InputProps={{
                                        sx: {
                                            '& .MuiInputBase-input':
                                            {
                                                color: "#EBE5D7",
                                                fontSize: "14pt",

                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                            {
                                                borderColor: "#EBE5D7",
                                            }
                                        },
                                    }}

                                />
                            </div>

                        </div>
                        <div className={styles.margin_left}>
                            <div className={styles.stats_item}>
                                <SelectLabels disabled={!checked} onChange={handleRoleChange} label="Роль" value={roleValue} items={roles} />
                            </div>
                            <div className={styles.stats_item}>
                                <SelectLabels disabled={!checked} onChange={handleStatementChange} label="Предположение" value={statement} items={shoot} />
                            </div>
                    
                          
                        
                        </div>
                    </div>

                </div>


            </CardContent>
        </Card>
    )
}

const roles = [
    {
        value:1,
        label:"Мирный"
    },
    {
        value:2,
        label:"Мафия"
    },
    {
        value:10,
        label:"Шериф"
    },
    {
        value:11,
        label:"Дон"
    },
]

const shoot = [
    {
        value:0,
        label:"Нет"
    },
    {
        value:1,
        label:"3  Чёрные"
    },
    {
        value:2,
        label:"2 Чёрные"
    },
    {
        value:3,
        label:"3 Красные"
    },
]