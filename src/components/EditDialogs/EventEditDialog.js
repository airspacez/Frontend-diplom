

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
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { format, parseISO } from 'date-fns';
import { convertCitiesForSelectComponent, convertGamePlacesForSelectComponent } from '../../Utils/DataConverterUtils'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Hidden } from '@mui/material';
import  Checkbox  from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function EventEditDialog(props) {
    const { open } = props;
    const { onClose } = props;
    const { entityId } = props;
    const { onDataEdited } = props;
    const { onDataDeleted } = props;

    const [entityData, setEntityData] = useState();

    const [selectedPlaceId, setSelectedPlaceId] = useState();
    const [datetime, setDatetime] = useState();
    const [places, setPlaces] = useState();

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
                console.log(entityId);
                var places = await DataAccessService.getGamePlaces(0, 9999);
                var data = await DataAccessService.getEventById(entityId, abortController.signal);
                console.log(data);
                var datetime = parseISO(data.datetime);
                setDatetime(datetime);
                setPlaces(places.content);
                console.log(places);
                setSelectedPlaceId(data.place.id);
                setEntityData(data);
                setLoading(false);
            }
            fetchData();
        }
        return () => {
            // Отмена запроса при размонтировании компонента или изменении зависимостей
            abortController.abort();
        };
    }, [open, entityId]);

    function handleClose() {
        setEntityData();
        onClose();
        setLoading(true);}

        useEffect(() => {
        if (isSmallScreen) {
          setFullScreen(true);
        } else {
          setFullScreen(false);
    }}, [isSmallScreen]);


    const handleCitySelect = (value) => 
    {
        setSelectedPlaceId(value);
    }

    const handleClubNameChange = (event) => {
       
        setEntityData((prevData) => ({
            ...prevData,
            name: event.target.value
        }));
    }

    const handleDescriptionChange = (event) => {
       
        setEntityData((prevData) => ({
            ...prevData,
            description: event.target.value
        }));
    }

    const handleDateTimeChange = (value) => {
        
        var formattedDate = format(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        setEntityData((prevData) => ({
            ...prevData,
            datetime: formattedDate
        }));
        
       
    }

  

    const handleDelete = async () => 
    {
        try {
            setSaveInProgress(true);
            var result = await DataAccessService.deleteEventById(entityId);
            if (result) {
                onDataDeleted(entityId);
                handleClose();
            }
        } catch (error) {
            console.error('Произошла ошибка при обновлении данных', error);
        } finally {
            // Установка состояния isLoading в false после получения ответа от сервера
            setSaveInProgress(false);
        }
    }

    const handleSave = async (event) => {
        event.preventDefault();
            console.log(entityData.datetime);
        var updates = {
            name:entityData.name,
            place:selectedPlaceId,
            description:entityData.description,
            datetime: format(parseISO(entityData.datetime), "yyyy-MM-dd hh:mm:ss"), 
        }

        try {
            setSaveInProgress(true);
            console.log(entityData.datetime);
            var result = await DataAccessService.patchEvent(entityId, updates);
            console.log(result);

            if (result) {               
                var editedCityName = places[places.findIndex(item => item.id === selectedPlaceId)];
                
                onDataEdited(entityId,{...updates,placeName: editedCityName});
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
                    <List>
                        <ListItem>
                            <TextField fullWidth required
                                label="Название мероприятия"
                                value={entityData.name ? entityData.name : ""}
                                onChange={handleClubNameChange}
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
                            <TextField fullWidth required multiline
                                label="Описание мероприятия"
                                value={entityData.description ? entityData.description : ""}
                                onChange={handleDescriptionChange}
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker 
                                    value={datetime}
                                   
                                    onChange={handleDateTimeChange}
                                    label={'Время проведения'}
                                    
                                    slotProps={{

                                        textField:
                                        { 
                                            fullWidth: true,
                                            
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
                        </ListItem>       
                        <ListItem>
                            <SelectLabels label="Место проведения" items={convertGamePlacesForSelectComponent(places)}
                                value={selectedPlaceId}
                                onChange={handleCitySelect}
                            />
                        </ListItem>
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
            <Button  variant='contained'  style={{color:"#EBE5D7", background:"#8b0000"}} onClick={handleDelete}>Удалить</Button>
            <Button style={{color:"#EBE5D7"}} type='submit' form="form" >Сохранить</Button></>)}
            </DialogActions>
            </Hidden>
            
            </Dialog>
        
    )
}

