import React, { useState } from "react";
import { Container, FormControl, TextField, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, Link } from "react-router-dom";

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

export default function ForgetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmailSubmit = (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.alert("Пожалуйста, введите корректный адрес электронной почты");
            return;
        }

        const checkUser = `http://localhost:8080/getUserByEmail?mail=${email}`;
        const url = `http://localhost:8080/token?mail=${email}`;

        fetch(checkUser)
            .then((response) => {
                if (response.ok) {
                    return fetch(url);
                } else if (response.status === 404) {
                    setErrorModalOpen(true);
                } else {
                    throw new Error("Ошибка при вызове метода getUserByEmail: " + response.status);
                }
            })
            .then((response) => {
                if (response.ok) {
                    console.log("Метод passwordResetToken вызван успешно");
                    navigate(`/accept_token?email=${email}`);
                } else {
                    throw new Error("Ошибка при вызове метода passwordResetToken: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Ошибка при вызове метода passwordResetToken:", error);
            });
    };


    const handleModalClose = () => {
        setErrorModalOpen(false);
    };

    const styles = useStyles();
    return (
        <Container maxWidth="lg">
            <div className={styles.wrapper}>
                <div className={styles.auth_form}>
                    <form onSubmit={handleEmailSubmit}>
                        <div className={styles.h1 + " " + styles.text_light}>Восстановление пароля</div>
                        <div className={styles.h5 + " " + styles.text_light}>Введите свой электронный адрес</div>
                        <FormControl fullWidth>
                            <TextField
                                className={styles.text_field}
                                type="text"
                                variant="outlined"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <div className={styles.form_buttons}></div>
                            <Button className={styles.button_filled} type="submit" variant="contained">
                                Отправить письмо
                            </Button>
                            <Link to="/auth" className={styles.link + " " + styles.white_text}>
                                Вернуться к авторизации
                            </Link>
                        </FormControl>
                    </form>
                </div>
            </div>
            <Modal open={errorModalOpen} onClose={handleModalClose}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>Ошибка!</h2>
                    </div>
                    <div className={styles.modalBody}>
                        <p className={styles.modalText}>Пользователь с указанной почтой не найден!</p>
                    </div>
                    <div className={styles.modalFooter}>
                        <Button className={styles.modalButton} onClick={handleModalClose}>
                            Закрыть
                        </Button>
                    </div>
                </div>
            </Modal>
        </Container>
    );
}