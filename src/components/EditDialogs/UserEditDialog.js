

import { useState, useEffect, forwardRef } from 'react'

import TextField from "@mui/material/TextField";
import SelectLabels from '../Select/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DataAccessService from '../../Services/DataAccessService';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@mui/material/Slide';
import {DialogActions} from '@mui/material';
import MultipleSelectCheckmarks from '../MultipleSelectCheckmarks/MultipleSelectCheckmarks'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { format, parseISO } from 'date-fns';
import { convertClubsForSelectComponent, convertStatusesForSelectComponent, convertRolesForSelectComponent } from '../../Utils/DataConverterUtils'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Hidden } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PlaceEditDialog(props) {
    const { open } = props;
    const { onClose } = props;
    const { entityId } = props;

    const [entityData, setEntityData] = useState();
    const [clubs, setClubs] = useState();
    const [selectedClubId, setSelectedClubId] = useState();

    const [statuses, setStatuses] = useState();
    const [selectedStatuseId, setSelectedStatuseId] = useState();

    const [roles, setRoles] = useState();
    const [selectedRoleId, setSelectedRoleId] = useState();

    const [loading, setLoading] = useState(true);
    const [saveInProgress, setSaveInProgress] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [fullScreen, setFullScreen] = useState(false);

    
    useEffect(() => {
        const abortController = new AbortController();
        // При открытии диалога загрузите данные
        if (open && entityId) {
            async function fetchData() {
                var clubs = await DataAccessService.getClubs();
                var statuses = await DataAccessService.getStatuses();
                var roles = await DataAccessService.getAllUserRoles();
                var data = await DataAccessService.getUserDataById(entityId, abortController.signal);
                setRoles(roles);
                setClubs(clubs);
                setStatuses(statuses);
                setEntityData(data);
                setSelectedRoleId(data.role.id)
                setSelectedStatuseId(data.status.id);
                setSelectedClubId(data.club.id);
                setLoading(false);
            }
            fetchData();
        }
        return () => {
            // Отмена запроса при размонтировании компонента или изменении зависимостей
            abortController.abort();
        };
    }, [open, entityId]);

    useEffect(() => {
        if (isSmallScreen) {
          setFullScreen(true);
        } else {
          setFullScreen(false);
        }
    }, [isSmallScreen]);

    const handleNameChange = (event) => {

        setEntityData((prevData) => ({
            ...prevData,
            name: event.target.value
        }));
    }

    const handleLoginChange = (event) => {

        setEntityData((prevData) => ({
            ...prevData,
            username: event.target.value
        }));
    }

    const handleNicknameChange = (event) => {

        setEntityData((prevData) => ({
            ...prevData,
            nickname: event.target.value
        }));
    }

    const handleAltNicknameChange = (event) => {

        setEntityData((prevData) => ({
            ...prevData,
            altNickname: event.target.value
        }));
    }

    const handleEmailChange = (event) => {

        setEntityData((prevData) => ({
            ...prevData,
            email: event.target.value
        }));
    }

    const handlePhoneNumberChange = (event) => {

        setEntityData((prevData) => ({
            ...prevData,
            phoneNumber: event.target.value
        }));
    }

    const handleBirthdayDateChange = (value) => {
        console.log(value);
        setEntityData((prevData) => ({
            ...prevData,
            birthdayDate: value ? format(value, 'yyyy-MM-dd') : null
        }));
    }

    const handleSexChange = (value) => {

        setEntityData((prevData) => ({
            ...prevData,
            isMale: value === 1 ? true : false
        }));
    }

    const handleSelectClub = (value) => {
        setSelectedClubId(value);
    }

    const handleSelectStatuse = (value) => {
        setSelectedStatuseId(value);
    }

    const handleSelectRole = (value) => {
        setSelectedRoleId(value);
    }

    function handleClose() {
        setEntityData();
        onClose();
        setLoading(true);

    }

    const handleSave = async (event) => {
        event.preventDefault();
        var updates = {
            name: entityData.name,
            nickname: entityData.nickname,
            altNickname: entityData.altNickname,
            email: entityData.email,
            isMale: entityData.isMale,
            phoneNumber: entityData.phoneNumber,
            club: selectedClubId,
            role: selectedRoleId,
            status: selectedStatuseId,
            birthdayDate:entityData.birthdayDate,
            username:entityData.username
        }
        try {
            setSaveInProgress(true);
            var result = await DataAccessService.patchUserData(entityId, updates);
            if (result) {
                handleClose();
            }
        } catch (error) {
            console.error('Произошла ошибка при обновлении данных', error);
        } finally {
            // Установка состояния isLoading в false после получения ответа от сервера
            setSaveInProgress(false);
        }
    }

    return (
       
            <Dialog 
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            scroll='paper'
            
            PaperProps={{
                sx:{
                    background:"#333333"
                }
            }}
            
        >
          
            <DialogTitle sx={{ padding: 0 }} id="scroll-dialog-title"><AppBar sx={{ background:"#333333", color:"#EBE5D7", position: 'relative' }}>
                <Hidden smUp>
                <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                    <span>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    Редактировать
                    </span>
                    {!loading && <Button color="inherit" type='submit' form="form" >
                        Сохранить
                    </Button>}
                </Toolbar>
                </Hidden>
                <Hidden smDown>
                    <Toolbar>Редактировать</Toolbar></Hidden>
            </AppBar>
            </DialogTitle>
            <DialogContent>
            
                {!loading ? (
                      <form id="form" onSubmit={handleSave}  >
                    <List sx={{ display:isSmallScreen ? "" : "flex", flexDirection:"row"}}>
                        <div>
                        <ListItem>
                            <TextField fullWidth required
                                label="Имя пользователя"
                                value={entityData.nickname ? entityData.nickname : ""}
                                onChange={handleNicknameChange}
                                InputLabelProps={
                                    {
                                        sx:{
                                            color:"#EBE5D7",
                                            '&.Mui-focused':
                                            {
                                                color:"#EBE5D7",
                                            }
                                        }
                                    }
                                }
                                InputProps={{
                                    sx:{
                                        '& .MuiInputBase-input':
                                        {
                                            color: "#EBE5D7",
                                            fontSize: "14pt",

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                        {
                                            borderColor:"#EBE5D7",
                                        }
                                    },
                                }}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <TextField fullWidth
                                label="Реальное имя"
                                value={entityData.name ? entityData.name : ""}
                                onChange={handleNameChange}
                                InputLabelProps={
                                    {
                                        sx:{
                                            color:"#EBE5D7",
                                            '&.Mui-focused':
                                            {
                                                color:"#EBE5D7",
                                            }
                                        }
                                    }
                                }
                                InputProps={{
                                    sx:{
                                        '& .MuiInputBase-input':
                                        {
                                            color: "#EBE5D7",
                                            fontSize: "14pt",

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                        {
                                            borderColor:"#EBE5D7",
                                        }
                                    },
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField fullWidth required
                                label="Логин"
                                value={entityData.username ? entityData.username : ""}
                                onChange={handleLoginChange}
                                InputLabelProps={
                                    {
                                        sx:{
                                            color:"#EBE5D7",
                                            '&.Mui-focused':
                                            {
                                                color:"#EBE5D7",
                                            }
                                        }
                                    }
                                }
                                InputProps={{
                                    sx:{
                                        '& .MuiInputBase-input':
                                        {
                                            color: "#EBE5D7",
                                            fontSize: "14pt",

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                        {
                                            borderColor:"#EBE5D7",
                                        }
                                    },
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField fullWidth
                                label="Альтернативный никнейм"
                                value={entityData.altNickname ? entityData.altNickname : ""}
                                onChange={handleAltNicknameChange}
                                InputLabelProps={
                                    {
                                        sx:{
                                            color:"#EBE5D7",
                                            '&.Mui-focused':
                                            {
                                                color:"#EBE5D7",
                                            }
                                        }
                                    }
                                }
                                InputProps={{
                                    sx:{
                                        '& .MuiInputBase-input':
                                        {
                                            color: "#EBE5D7",
                                            fontSize: "14pt",

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                        {
                                            borderColor:"#EBE5D7",
                                        }
                                    },
                                }}
                            />
                        </ListItem>

                        <ListItem>
                            <SelectLabels label="Пол" items={sex}
                                value={entityData.isMale ? 1 : 0}
                                onChange={handleSexChange}
                            />
                        </ListItem>
                        </div>
                        <div>
                        <ListItem>
                            <TextField fullWidth required
                                form="form"
                                type='email'
                                label="Email"
                                value={entityData.email ? entityData.email : ""}
                                onChange={handleEmailChange}
                                InputLabelProps={
                                    {
                                        sx:{
                                            color:"#EBE5D7",
                                            '&.Mui-focused':
                                            {
                                                color:"#EBE5D7",
                                            }
                                        }
                                    }
                                }
                                InputProps={{
                                    sx:{
                                        '& .MuiInputBase-input':
                                        {
                                            color: "#EBE5D7",
                                            fontSize: "14pt",

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                        {
                                            borderColor:"#EBE5D7",
                                        }
                                    },
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField fullWidth
                                label="Номер телефона"
                                type='tel'
                                value={entityData.phoneNumber ? entityData.phoneNumber : ""}
                                onChange={handlePhoneNumberChange}
                                InputLabelProps={
                                    {
                                        sx:{
                                            color:"#EBE5D7",
                                            '&.Mui-focused':
                                            {
                                                color:"#EBE5D7",
                                            }
                                        }
                                    }
                                }
                                InputProps={{
                                    sx:{
                                        '& .MuiInputBase-input':
                                        {
                                            color: "#EBE5D7",
                                            fontSize: "14pt",

                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline ':
                                        {
                                            borderColor:"#EBE5D7",
                                        }
                                    },
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <SelectLabels label="Клуб" items={convertClubsForSelectComponent(clubs)} value={selectedClubId}
                                onChange={handleSelectClub}
                            />
                        </ListItem>
                        <ListItem>
                            <SelectLabels label="Статус" items={convertStatusesForSelectComponent(statuses)} value={selectedStatuseId}
                                onChange={handleSelectStatuse}
                            />
                        </ListItem>
                        <ListItem>
                            <SelectLabels label="Роль" items={convertRolesForSelectComponent(roles)} value={selectedRoleId}
                                onChange={handleSelectRole}
                            />
                        </ListItem>
                        <ListItem>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disableHighlightToday
                                    disableFuture
                                    value={parseISO(entityData.birthdayDate)}
                                    label={'Дата рождения'}
                                    onAccept={handleBirthdayDateChange}
                                    slotProps={{

                                        textField:
                                        { 
                                            fullWidth: true,
                                            readOnly: true,
                                            sx:
                                            {
                                                '& .MuiInputBase-input':
                                                {
                                                    color: "#EBE5D7",
                                                    fontSize: "12pt",

                                                },

                                                '& .MuiInputLabel-root':
                                                {
                                                    color: "#EBE5D7",
                                                    fontSize: "12pt",

                                                },
                                                '.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                {
                                                    border: "2px solid #EBE5D7"
                                                },
                                                '& .MuiSvgIcon-root':
                                                {
                                                    color: "#EBE5D7"
                                                }
                                            }
                                        },
                                        popper: {
                                            sx:
                                            {
                                                '& .MuiPaper-root':
                                                {
                                                    background: "#484646",
                                                },
                                                '& .MuiPickersDay-root':
                                                {
                                                    color: "#EBE5D7",
                                                    fontSize: "12pt",
                                                    '&:hover':
                                                    {
                                                        backgroundColor: "rgba(235, 229, 215, 0.04)"
                                                    }
                                                },
                                                '& .MuiDayCalendar-weekDayLabel':
                                                {
                                                    color: "#EBE5D7",
                                                    fontSize: "12pt"
                                                },
                                                '& .MuiPickersCalendarHeader-label':
                                                {
                                                    color: "#EBE5D7",
                                                    fontSize: "12pt"
                                                },
                                                '& .MuiSvgIcon-root':
                                                {
                                                    color: "#EBE5D7"
                                                },
                                                '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected':
                                                {
                                                    backgroundColor: "#EBE5D7",
                                                    color: "#333333"

                                                },
                                                '& .MuiPickersYear-yearButton':
                                                {
                                                    color: "#EBE5D7",
                                                    fontSize: "12pt",
                                                    '&.Mui-selected':
                                                    {
                                                        backgroundColor: "#EBE5D7",
                                                        color: "#000"
                                                    },
                                                    '&:hover':
                                                    {
                                                        backgroundColor: "rgba(235, 229, 215, 0.04)"
                                                    }

                                                }
                                            }
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </ListItem></div>
                    </List></form>) : (<Box sx={{ height: "100%", justifyContent: "center", alignItems: "center", display: 'flex' }}>
                        <CircularProgress sx={{color:"#EBE5D7"}} />    
                    </Box>)}
                    {saveInProgress && (
                    <div
                        style={{
                            position:"absolute",
                            top:0,
                            left:0,
                            width: '100%',
                            height: '100%',
                            zIndex: 9999,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999,
                            }}
                        >
                            <CircularProgress />
                        </div>
                    </div>
                )}
                 
            </DialogContent>
            <Hidden smDown>
            <DialogActions sx={{display:'flex', justifyContent:'space-evenly'}}> 
                
            {!loading &&(<>
            <Button  style={{color:"#EBE5D7"}} onClick={handleClose}>Отмена</Button> 
            <Button style={{color:"#EBE5D7"}} type='submit' form="form" >Сохранить</Button></>)}
            </DialogActions>
            </Hidden>
            
            </Dialog>
        
    )
}

const sex = [
    {
        value: 0,
        label: "Женский"
    },
    {
        value: 1,
        label: "Мужской"
    },
]