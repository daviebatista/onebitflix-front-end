import { Container } from "reactstrap";
import styles from './styles.module.scss';

const Footer = function () {
    return (
        <>
            <Container className={styles.footer}>
                <img 
                src="/logoVeritas.png" 
                alt="logoFooter" 
                className={styles.footerLogo} 
                />
                <a 
                href="http://google.com" 
                target={"_blank"} 
                className={styles.footerLink}
                >
                    VERITAS.COM
                </a>
            </Container>
        </>
    )
};

export default Footer