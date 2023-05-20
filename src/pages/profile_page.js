import { useState, useEffect } from 'react';
import Container from "@material-ui/core/Container"
import { makeStyles } from '@material-ui/core/styles';
import placeholder from "./../media/images/placeholder_2.jpg"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RecipeReviewCard from '../components/GameCard/GameCard';
import SelectLabels from '../components/Select/Select';
import DataAccessService from "../Services/DataAccessService";



const useStyles = makeStyles((theme) => ({

    profile_container:
    {
        textTransform: "uppercase",
        boxSizing: "border-box",
        marginTop: "12px",
        borderRadius: "4px",
        background: "#EBE5D7",
        width: "100%",
        padding: "12px",
        height: "fit-content",

        display: "flex",

        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
            padding: "0px",

        },


    },
    profile_image_container:
    {

        marginBottom: "20px",
        width: "192px",
        height: "256px",

        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.3)",


        [theme.breakpoints.down('sm')]: {

            maxWidth: "50%",
            width: "100%",
            height: "100%",
        },

        [theme.breakpoints.down('xs')]: {

            maxWidth: "100%",
            maxHeight: "350px",
            width: "100%",

            marginBottom: "20px",
        },


    },
    profile_image:
    {
        display: "block",
        height: "100%",
        width: "100%",
        objectFit: "cover",
        objectPosition: "center",
        borderRadius: "8px",
        [theme.breakpoints.down('xs')]: {

            maxWidth: "100%",
            maxHeight: "350px",


        },
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
        [theme.breakpoints.down('sm')]: {
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gridAutoRows: "auto",
            gridGap: "12px",
            width: "100%",

        },
        [theme.breakpoints.down('xs')]: {
            display: "flex",
            flexDirection: "column",

        },
    },
    game_item:
    {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "'Roboto', sans-serif",
        textTransform: "uppercase",
        marginBottom: "24px",
        background: "#EBE5D7",
        padding: "16px",
        borderRadius: "12px"
    },
    game_data:
    {
        fontSize: "14pt",
        fontWeight: "600",
        height: "fit-content",
        textAlign: "left",
    },
    game_result_container:
    {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",

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
        flexDirection: "row"
    },
    game_data_block:
    {
        marginRight: "36px"
    }

}))



export default function ProfilePage() {

    const styles = useStyles();
    const [userStatistics, setUserStatistics] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userLastGames, setUserLastGames] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [winRate, setWinRate] = useState(0);

    useEffect(() => {
        async function fetchStatistics() {
            const stats = await DataAccessService.getSimpleStatistics();
            const userData = await DataAccessService.getUserData();
            const lastGamesData = await DataAccessService.getUserLastGames();
            setUserStatistics(stats);
            const dateObj = new Date(userData.birthdayDate);
            const options = { day: 'numeric', month: 'long' };
            const formattedDate = dateObj.toLocaleDateString('ru-RU', options);
            userData.birthdayDate = formattedDate;
            setUserData(userData);
            setUserLastGames(lastGamesData);
            setPageLoaded(true);

        }
        fetchStatistics();
    
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setWinRate(userStatistics ? userStatistics.winRate : 0);
        }, 400); 
        return () => clearTimeout(timeoutId);
      }, [pageLoaded]);

    return (
        <Container maxWidth="lg">
            {pageLoaded ? (
             <>
            <div className={styles.profile_container}>
                <div className={styles.profile_image_container}>
                    <img src={placeholder} className={styles.profile_image}></img>
                </div>
                <div className={styles.profile_info}>
                    <div className={styles.profile_data_name}>
                        <span className={styles.profile_name_text}>{userData && userData.isMale ? "Г-н" : "Г-жа" } {userData ? userData.nickname : ""}</span>
                    </div>

                    <div className={styles.profile_info_container}>

                        <div className={styles.profile_info_primary}>

                            <div className={styles.profile_data}>
                                <span className={styles.data_prefix}>Реальное имя: </span>
                                <span className={styles.data}>{userData ? userData.name : "Нет данных"}</span>
                            </div>
                            <div className={styles.profile_data}>
                                <span className={styles.data_prefix}>Игровой клуб: </span>
                                <span className={styles.data}>{userData ? userData.club.clubName : "Нет данных"}</span>
                            </div>
                            <div className={styles.profile_data}>
                                <span className={styles.data_prefix}>Статус: </span>
                                <span className={styles.data}>{userData ? userData.status.description : "Нет данных"}</span>
                            </div>

                        </div>
                        <div className={styles.profile_info_secondary}>

                            <div className={styles.profile_data}>
                                <span className={styles.data_prefix}>День рождения: </span>
                                <span className={styles.data}>{userData && userData?.birthdayDate ? userData.birthdayDate : "Нет данных"}</span>
                            </div>
                            <div className={styles.profile_data}>
                                <span className={styles.data_prefix}>EMAIL:  </span>
                                <span className={styles.data + " " + styles.email}>{userData && userData?.email !== "" ? userData.email : "НЕТ ДАННЫХ"}</span>
                            </div>
                            <div className={styles.profile_data}>
                                <span className={styles.data_prefix}>Телефон: </span>
                                <span className={styles.data}>{userData && userData?.phoneNumber ? userData.phoneNumber : "Нет данных"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.statistics_container}>
                <div className={styles.h1 + " " + styles.text_light}>Статистика</div>
                
                <div className={styles.stats_content}>

                    <div className={styles.stats}>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ИГР СЫГРАНО</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.totalGames : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ПОБЕД</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.wins : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ПОРАЖЕНИЙ</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.totalGames - userStatistics.wins : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ИГР ЗА МАФИЮ</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.mafiaWGames : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ВСЕГО ОЧКОВ</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.totalPoints : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ДОП. БАЛЛЫ</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.extraPoints : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ШТРАФ</div>
                            <div className={styles.stat_item_value}>{userStatistics ? -userStatistics.totalPenalty : 'Loading...'}</div>
                        </div>

                        <div className={styles.stat_item}>
                            <div className={styles.stat_item_name}>ИГР ЗА МИРНЫХ</div>
                            <div className={styles.stat_item_value}>{userStatistics ? userStatistics.citizensGames : 'Loading...'}</div>
                        </div>
                    </div>
                    <div className={styles.winrate_container}>
                        <CircularProgressbarWithChildren strokeWidth={5} styles={
                            buildStyles({
                                rotation: 0.5,
                                strokeLinecap: 'butt',
                                pathTransitionDuration: 1,
                                pathColor: `#EBE5D7`,
                                trailColor: '#333333',
                            })
                        }  
                        value={winRate} >
                            <div className={styles}>
                                <div className={styles.stat_item_name}>ВИНРЕЙТ</div>
                                <div className={styles.stat_item_value}>{userStatistics.winRate}%</div>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            </div>
            <div className={styles.last_games_container}>
                <div className={styles.h1 + " " + styles.text_light}>ПОСЛЕДНИЕ ИГРЫ</div>
                <div className={styles.games_container}>
                    {userLastGames?.map(gamedata => (
                        <RecipeReviewCard data={gamedata} key={gamedata.id.gameId} />
                    ))}
                </div>
            </div> 
            </>
            )
        :
        (   
            <div className={styles.h1}>Loading...</div>
        )
        }
        </Container>
    )
}

