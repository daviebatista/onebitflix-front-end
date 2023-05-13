import Head from "next/head";
import styles from "../styles/profile.module.scss";
import UserForm from "@/components/profile/user";
import HeaderAuth from "@/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "@/components/common/footer";
import { useState, useEffect } from 'react'
import PasswordForm from "@/components/profile/password";

const UserInfo = function   ()  {
    const [form, setForm] = useState("userForm")

    return(
        <>
            <Head>
                <title>Meus dados</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            <main>
                <div className={styles.header}>
                    <HeaderAuth/>
                </div>
                <Container className="py-5">
                    <p className={styles.title}>Minha conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button className={styles.renderForm}
                            onClick={() => {setForm("userForm")}}
                            style={{color: form === 'userForm' ? '#ffc800' : "white"}}
                            >Dados Pessoais</Button>
                            <Button 
                            className={styles.renderForm} 
                            onClick={() => {setForm("passwordForm")}}
                            style={{color: form === 'passwordForm' ? '#ffc800' : "white"}}
                            >Senha</Button>
                        </Col>
                        <Col md>
                            {form === 'userForm' ? <UserForm/> : <PasswordForm/>}
                        </Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer/>
                </div>
            </main>
        </>
    )
}

export default UserInfo