
import { useState, useEffect, forwardRef } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import SelectLabels from '../Select/Select';
import Pagination from '@material-ui/lab/Pagination';

import PlaceEditDialog from '../EditDialogs/PlaceEditDialog';
import PlaceCard from '../PlaceCardAdmin/PlaceCard'
import Button from '@mui/material/Button'
import AddPlaceDialog from '../AddDialogs/AddPlaceDialog';
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
        justifyContent: "space-between",
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



export default function AdminPlacePanel(props) {
    const {countPerPagePlaces} = props;
    const {data} = props;
    const {currentPage} = props;
    
    const {onPageChange} = props;
    const {onCountPerPageChange} = props;

    const {onPlaceEdited} = props;
    const {onPlaceDeleted} = props;

    const [isEditDialogOpen, setDialogOpen] = useState(false);
    const [currentEditingUserId, setCurrentEditingUserId] = useState();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const handleClickOpen = (id) => {
        setCurrentEditingUserId(id);
        setDialogOpen(true);
    };
    
    const handleUserEditDialogClose = () => 
    {
        setDialogOpen(false);
    };

    const handleAddPlaceClickButton = () =>
    {
        setIsAddDialogOpen(true);
    }
 
    const handlePlaceAddDialogClose = () => 
    {
        setIsAddDialogOpen(false);
    };

    const styles = useStyles();
    

    return (

                <>
                    <div className={styles.user_filter_container}>
                        <Button onClick={handleAddPlaceClickButton}  sx={{ color:"#EBE5D7"}} variant='outlined'>+ Добавить место</Button>
                        <div className={styles.pagination_count_container}><SelectLabels items={pageValues} value={countPerPagePlaces} onChange={onCountPerPageChange} label="Показывать по" /></div></div>
                    <div>
                        {data?.content?.map(place =>
                            <PlaceCard data={place} key={place.id} onEditClick={handleClickOpen} />
                        )}
                    </div>
                    <div className={styles.pagination_container}>
                        <Pagination size="large" variant="text" shape="rounded" classes={{ root: styles.root }} boundaryCount={1} siblingCount={0} count={data ? data.totalPages : 0} page={currentPage} onChange={onPageChange} />
                    </div>
                    <PlaceEditDialog onDataDeleted={onPlaceDeleted} onDataEdited={onPlaceEdited} open={isEditDialogOpen} entityId={currentEditingUserId} onClose={handleUserEditDialogClose}/>
                    <AddPlaceDialog open={isAddDialogOpen} onClose={handlePlaceAddDialogClose}></AddPlaceDialog>
                </>
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
    {
        value: 100,
        label: "100"
    },
]

