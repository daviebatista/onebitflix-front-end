import HeaderGeneric from "@/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import {  Form, FormGroup, Label, Container, Button, Input  } from "reactstrap"
import Footer from "@/components/common/footer";
import { FormEvent, use, useState } from "react";
import authService from "@/services/authService";
import { useRouter } from "next/router";
import ToastComponent from "@/components/common/toast";

const Register = function () {
    const router = useRouter()
    const [ toastIsOpen, setToastIsOpen ] = useState(false)
    const [toastMessage, setToastMessage ] = useState("")

    const handleRegister    =   async   (event: FormEvent<HTMLFormElement>)  =>  {
        event.preventDefault()

        const formData  =   new FormData(event.currentTarget)
        const firstName =   formData.get('firstName')!.toString()
        const lastName =   formData.get('lastName')!.toString()
        const phone =   formData.get('phone')!.toString()
        const birth =   formData.get('birth')!.toString()
        const email =   formData.get('email')!.toString()
        const password =   formData.get('password')!.toString()
        const confirmPassword =   formData.get('confirmPassword')!.toString()

        const params = {
            firstName,
            lastName,
            phone,
            birth,
            email,
            password
        }

        if  (password !== confirmPassword)  {
            setToastIsOpen(true)
            setTimeout(()   =>  {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessage("As senhas não batem!")

            return
        }

        const { data, status } = await authService.register(params)

        if (data.status === 201) {
            router.push('/login?registered=true')
        } else {
            setToastIsOpen(true)
            setTimeout(()   =>  {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessage(data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Veritas - Registro</title>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta name="description" content="Registre-se na melhor plataforma de erudição em história e filosofia."/>
                <script src="https://jsuites.net/v4/jsuites.js" defer></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Logar"   />
                <Container className="py-5">
                <p className={styles.formTitle}>Bem-vindo ao Veritas!</p>
                <Form className={styles.form} onSubmit={handleRegister}>
                    <p className="text-center">
                        <strong>Crie sua conta</strong>
                    </p>
                    <FormGroup>
                        <Label for="firstName" className={styles.label}>Nome</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Qual o seu nome?"
                            required
                            maxLength={20}
                            className={styles.inputName}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName" className={styles.label}>Sobrenome</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Qual o seu sobrenome?"
                            required
                            maxLength={20}
                            className={styles.inputName}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone" className={styles.label}>Número de telefone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            data-mask="[-]+55 (00) 00000-0000"
                            placeholder="(XX) 9XXXX-XXXX"
                            required
                            maxLength={20}
                            className={styles.input}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className={styles.label}>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Digite o seu e-mail"
                            required
                            maxLength={20}
                            className={styles.input}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="birth" className={styles.label}>Data de nascimento</Label>
                        <Input
                            id="birth"
                            name="birth"
                            type="date"
                            min="1930-01-01"
                            max="2005-12-31"
                            required
                            className={styles.input}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className={styles.label}>Senha</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                            required
                            minLength={6}
                            maxLength={20}
                            className={styles.input}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword" className={styles.label}>Confirme a sua senha</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                            required
                            minLength={6}
                            maxLength={20}
                            className={styles.input}
                            />
                    </FormGroup>
                    <Button type="submit" outline className={styles.formBtn}>
                        CADASTRAR
                    </Button>
                </Form>
            </Container>
            <Footer/>
            <ToastComponent 
                color="bg-danger" 
                isOpen={toastIsOpen} 
                message={toastMessage}
            />
            </main>

        </>
    );
};

export default Register;