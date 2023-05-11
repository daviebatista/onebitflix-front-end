import { Container, Button } from 'reactstrap';
import styles from './styles.module.scss';
import Link from 'next/link';

const HeaderNoAuth = function ()    {
    return (
    <>
        <div className={styles.ctaSection + ' sticky-top'}>
            <img
            src="/homeNoAuth/logoCta.png"
            alt="logoCta"
            className={styles.imgCta}
            />
            <p className='text-dark'>Se cadastre para ter acesso aos cursos</p>
            <img
            src="/homeNoAuth/logoCta.png"
            alt="logoCta"
            className={styles.imgCta}
            />
        </div>
        <Container className={styles.nav}>
            <img src="/logoVeritas.png" alt="logoOneBitFlix" className={styles.imgLogoNav}/>
            <div>
                <Link href='/login'>
                    <Button outline className={styles.navBtn}>Entrar</Button>
                </Link>
                <Link href='/register'>
                    <Button outline className={styles.navBtn}>Cadastrar-se</Button>
                </Link>
            </div>
        </Container>
    </>
    )
}

export default HeaderNoAuth