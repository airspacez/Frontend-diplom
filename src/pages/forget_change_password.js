import React, { useState } from "react";
import { Container, FormControl, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    auth_form: {
        maxWidth: "350px",
        width: "100%",
    },
    h1: {
        marginBottom: "16px",
        textAlign: "left",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "28pt",
        lineHeight: "1em",
        textTransform: "uppercase",
        textAlign: "center",
    },
    h5: {
        fontFamily: "'Oswald', sans-serif",
        textAlign: "center",
        marginBottom: "16px",
    },
    text_light: {
        color: "#EBE5D7",
    },
    form_buttons: {
        marginTop: "12px",
    },
    modalContent: {
        position: "absolute",
        top: "50%",
        left: "50%",
        background: "#333333",
        transform: "translate(-50%, -50%)",
        padding: theme.spacing(4),
        outline: "none",
        width: "400px",
        maxWidth: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    modalTitle: {
        fontFamily: "'Oswald', sans-serif",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#EBE5D7",
        textAlign: "center",
    },
    modalBody: {
        marginBottom: theme.spacing(2),
    },
    modalText: {
        fontSize: "16px",
        color: "#EBE5D7",
        textAlign: "center",
    },
    modalFooter: {
        display: "flex",
        justifyContent: "center",
    },
    modalButton: {
        color: "#EBE5D7",
        textTransform: "none",
        fontWeight: "bold",
        padding: theme.spacing(1),
        border: "1px solid #EBE5D7",
    },
    text_field: {
        marginBottom: "8px",
        "& .MuiInputBase-input": {
            color: "#EBE5D7",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#EBE5D7",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#EBE5D7",
            },
            "&:hover fieldset": {
                borderColor: "#EBE5D7",
            },
        },
    },
    button_filled: {
        marginBottom: "8px",
        background: "#EBE5D7",
    },
    white_text: {
        color: "#EBE5D7",
    },
    link: {
        textAlign: "right",
        fontSize: "12pt",
    },
}));

export default function AcceptPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password1, setPassword1] = useState(""); // Добавлено состояние для password1
  const [password2, setPassword2] = useState(""); // Добавлено состояние для password2

  const handlePasswordChange1 = (event) => {
    setPassword1(event.target.value);
  };

  const handlePasswordChange2 = (event) => {
    setPassword2(event.target.value);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const email = new URLSearchParams(location.search).get("email");
    console.log(email);
    const url = `http://localhost:8080/changePassword?password=${password2}&UserEmail=${email}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          navigate("/auth");
        } else if (response.status === 404) {
          throw new Error("Ошибка 404. при вызове метода handlePasswordSubmit: " + response.status);
        } else {
          throw new Error("Ошибка ДРУГАЯ при вызове метода handlePasswordSubmit: " + response.status);
        }
      });
  };

  const styles = useStyles();
  return (
    <Container maxWidth="lg">
      <div className={styles.wrapper}>
        <div className={styles.auth_form}>
          <form onSubmit={handlePasswordSubmit}>
            <div className={styles.h1 + " " + styles.text_light}>
              Создание нового пароля
            </div>
            <div className={styles.h5 + " " + styles.text_light}>
              Измените прежний пароль на новый
            </div>
            <FormControl fullWidth>
              <TextField
                className={styles.text_field}
                type="password"
                variant="outlined"
                placeholder="Введите пароль"
                value={password1}
                onChange={handlePasswordChange1}
              />
              <TextField
                className={styles.text_field}
                type="password"
                variant="outlined"
                placeholder="Введите пароль снова"
                value={password2}
                onChange={handlePasswordChange2}
              />
              <div className={styles.form_buttons}></div>
              <Button
                className={styles.button_filled}
                type="submit"
                variant="contained"
              >
                Сохранить
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </Container>
  );
}
