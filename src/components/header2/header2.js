import React, { useEffect, useState } from "react"
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { Container, Hidden, SwipeableDrawer } from "@material-ui/core";

import logoImagePathMedium from '../../media/logotip_header.png'
import logoImagePathSmall from "../../media/logotip_header_small.png"

import ProfileDropdown from "./ProfileDropdown";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider"
import placeholder from './../../media/images/placeholder_profile.jpg'
import { Link as LinkTo } from 'react-router-dom'
import ToolBarButton from './ToolBarButton'
import { useNavigate } from 'react-router-dom'
import HideOnScroll from "../HideOnScroll";

const useStyles = makeStyles((theme) => ({
    link: {
        marginRight: 20,
        marginLeft: 20,
        fontSize: "16pt",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: "400",
        color: "#000",
        textDecorationLine: "none"
    },
    appbar: {
        background: "#EBE5D7",


    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    container: {
        display: "flex",
        flexDirection: "row",

    },
    logo: {
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        maxWidth: "150px",
        width: "100%",
        padding: "5px 0px",
        objectFit: "contain",


    },
    logo_image: {
        maxWidth: "100%",
        maxHeight: "48px",
        width: "100%",
        objectFit: "contain"
    },
    my_profile_dropdown_img_container:
    {
        userSelect: "none",
        width: "192px",
        height: "256px",
        alignSelf: "center",
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2)",
    },
    iconButton: {
        width: 48,
        height: 48,
    },
    swipeDrawerPaper: {

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#333333"

    },
    profile_image_dropdown:
    {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"
    },
    top_nawigationdrawer_elements_container:
    {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },

    bottom_nawigationdrawer_elements_container:
    {

        paddingBottom: "12px",
        paddingTop: "36px",
        display: "flex",
        alignSelf: "flex-end",
        marginBottom: "0",
        width: "100%"
    },
    lightTextColor: {
        color: "#EBE5D7"
    },
    divider:
    {
        background: "#EBE5D7",
        marginTop: "10px",
        marginBottom: "10px"
    },
    toolbarLinksContainer:
    {
        display: "flex"
    }


}
));

function Header2() {
    const navigate = useNavigate();
    const styles = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const [activeButtonId, setActiveButtonId] = useState(null);


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleButtonClick = (buttonId) => {
        setActiveButtonId(buttonId);
    }

    return (
        <HideOnScroll >
        <AppBar className={styles.appbar} position="sticky">
            <Container maxWidth="xl" disableGutters >

                <ToolBar className={styles.toolbar}>
                    <Hidden mdUp>
                        <IconButton onClick={() => {
                            setOpenDrawer(true);
                        }}>
                            <MenuIcon></MenuIcon>
                        </IconButton>
                    </Hidden>

                    <div className={styles.logo}><img src={windowWidth > 576 ? logoImagePathMedium : logoImagePathSmall} className={styles.logo_image} /></div>

                    <Hidden smDown>
                        <div className={styles.toolbarLinksContainer}>

                            <ToolBarButton buttonId="archive" label="Архив" activeButtonId={activeButtonId} onButtonClick={(buttonId) => { handleButtonClick(buttonId); navigate("/archive") }} />
                            <ToolBarButton buttonId="rating" label="Рейтинг" activeButtonId={activeButtonId} onButtonClick={(buttonId) => { handleButtonClick(buttonId);  navigate("/rating")  }} />
                            <ToolBarButton buttonId="help" label="Помощь" activeButtonId={activeButtonId} onButtonClick={(buttonId) => { handleButtonClick(buttonId);  }} />
                            <ToolBarButton buttonId="schedule" label="Расписание" activeButtonId={activeButtonId} onButtonClick={(buttonId) => { handleButtonClick(buttonId); }} />
                            <ToolBarButton buttonId="admin" label="Админ" activeButtonId={activeButtonId} onButtonClick={(buttonId) => { handleButtonClick(buttonId);  }} />

                        </div>
                    </Hidden>
                    <ProfileDropdown image={placeholder} />
                </ToolBar>
            </Container>
            <SwipeableDrawer classes={{ paper: styles.swipeDrawerPaper }} swipeAreaWidth={0} anchor="left" open={openDrawer} onOpen={() => setOpenDrawer(true)} onClose={() => setOpenDrawer(false)}>
                <div className={styles.top_nawigationdrawer_elements_container}>
                    <IconButton className={styles.IconButton + " " + styles.lightTextColor} onClick={() => {
                        setOpenDrawer(false);
                    }}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Divider className={styles.divider} />

                    <div className={styles.my_profile_dropdown_img_container}>
                        <img className={styles.profile_image_dropdown} src={placeholder} />
                    </div>
                    <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" to="/profile">ПРОФИЛЬ</Link>
                    <Divider className={styles.divider} />

                    <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" href="">АРХИВ</Link>
                    <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" href="">РЕЙТИНГ</Link>
                    <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" href="">ПОМОЩЬ</Link>
                    <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" href="">РАСПИСАНИЕ</Link>
                    <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" href="">АДМИН</Link>

                </div>
                <div className={styles.bottom_nawigationdrawer_elements_container}>
                    <Hidden smUp>
                        <Link className={styles.link + " " + styles.lightTextColor} variant="button" underline="none" href="">ВЫЙТИ</Link>
                    </Hidden>
                </div>
            </SwipeableDrawer>
        </AppBar>
        </HideOnScroll>
    )
}

export default Header2;