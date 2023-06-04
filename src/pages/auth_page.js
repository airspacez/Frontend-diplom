import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button"
import { useState } from "react";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    wrapper:
    {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh"

    },
    auth_form:
    {
        maxWidth:"350px",
        width:"100%"
    },
    h1:
    {       

                 
        marginBottom: "16px",
        textAlign: "left",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "28pt",
        lineHeight: "1em",
        textTransform: "uppercase",
        textAlign:"center", 
          
        
    },
    text_light:
    {
        color: "#EBE5D7"
    },
    form_buttons:
    {
        marginTop:"12px"
    },

    text_field:
    {
        marginBottom:"8px",
        '& .MuiInputBase-input': {
            color: "#EBE5D7", // установите желаемый цвет текста здесь
        },

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: "#EBE5D7", // установите желаемый цвет обводки здесь
            },
            '&.Mui-focused fieldset': {
                borderColor: '#EBE5D7', // установите желаемый цвет обводки при фокусе здесь
              },
              '&:hover fieldset': {
                borderColor: '#EBE5D7', // установите желаемый цвет обводки при наведении здесь
              },
        }
        
    },
    button_outlined:
    {
        fontFamily:"'Roboto', sans-serif",
        fontWeight:"500",
        marginBottom:"8px",
        color:"#EBE5D7"
    },
    button_filled:
    {
        marginBottom:"8px",
        background:"#EBE5D7"
    },
    white_text:
    {
        color:"#EBE5D7",
    },
    link:
    {
        textAlign:"right",
        fontSize:"12pt",

    }

}));


export default function AuthPage()
{

    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorCode, setErrorCode] = useState(null);
    const handleLoginChange = (event) => {
      setLogin(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    
    const  handleLoginSubmit = async (event) => {
        event.preventDefault();
        
        var response = await AuthService.login(login, password);
        switch(response.status)
        {
            case 200:
                {
                    navigate("/");
                    break;
                }
            default:
                {
                    setErrorCode(response.status);
                    break;
                }
        }
        
        
    
      };

    const styles = useStyles();
    return(
        <>
            <Container maxWidth="lg">
                <div className={styles.wrapper}>
                    <div className={styles.auth_form}>
                       
                        <div className={styles.h1 + " " + styles.text_light}>Авторизация</div>
                        <form onSubmit={handleLoginSubmit}>
                        <FormControl fullWidth >
                        
                            <TextField  className={styles.text_field} type="text"  variant="outlined" placeholder="Логин"      value={login}
          onChange={handleLoginChange} />
                            <TextField className={styles.text_field} type="password"  variant="outlined" placeholder="Пароль" value={password}
          onChange={handlePasswordChange}/>
                            
                            <div className={styles.form_buttons}></div>
                            <Button className={styles.button_filled} type="submit" variant="contained">Сохранить пароль</Button>
                            <a href="#" className={styles.link + " " + styles.white_text} >Забыли пароль?</a>
                           { errorCode == 401 ? <div className={styles.white_text}>Неправильный логин или пароль</div> : "" }
                        </FormControl>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
}