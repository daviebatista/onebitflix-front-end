import styles from '../styles/registerLogin.module.scss';
import Head from 'next/head';
import HeaderGeneric from '@/components/common/headerGeneric';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Footer from '@/components/common/footer';


const Login = function()    {
    return  (
        <>
            <Head>
                <title>Veritas - Login</title>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta name="description" content="Faça login para assistir nossas aulas!"/>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Inscrever-me'/>
                <Container className='py-5'>
                    <p className={styles.formTitle}>
                        Bem-vindo de volta!
                    </p>
                    <Form className={styles.form}>
                        <p className='text-center'>
                            <strong>Bem-vindo ao Veritas!</strong>
                        </p>
                        <FormGroup>
                            <Label for='email' className={styles.label}>
                                E-mail
                            </Label>
                            <Input id='email' name='email' type='email' placeholder='Insira o seu e-mail' required className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='password' className={styles.label}>
                                E-mail
                            </Label>
                            <Input id='password' name='password' type='password' placeholder='Insira a sua senha' required className={styles.input} />
                        </FormGroup>
                        <Button outline className={styles.formBtn}>
                            LOGAR
                        </Button>
                    </Form>
                </Container>
                <Footer/>
            </main>

        </>
    )
}

export default Login