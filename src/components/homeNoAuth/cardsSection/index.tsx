import styles from './styles.module.scss';
import  {Container, Row, Col, Button} from 'reactstrap'

const CardsSection = function   ()  {
    return(
        <>
            <p className={styles.sectionTitle}>AMPLIE O SEU CONHECIMENTO</p>
            <Container className='d-flex flex-wrap justify-content-center gap-4 pb-5'>
                <div className={styles.card1}>
                    <p className={styles.cardTitle}>HISTÓRIA DA IGREJA CATÓLICA</p>
                    <p className={styles.cardDescription}>
                        Conheça a história da instituição mais antiga e mais longeva de toda a humanidade, desde o seu apogeu, passando por sua ascenção e momentos mais tensos.
                    </p>
                </div>
                <div className={styles.card2}>
                    <p className={styles.cardTitle}>GNOSE</p>
                    <p className={styles.cardDescription}>
                        Um dos temas mais polêmicos e profundos da antiguidade, infelizmente presente na atualidade, em muitas áreas que não imaginamos. Conheça a sua origem, e os riscos deste pensamento.
                    </p>
                </div>
                <div className={styles.card3}>
                    <p className={styles.cardTitle}>IDADE MÉDIA</p>
                    <p className={styles.cardDescription}>
                        Conheça os episódios mais importantes e mais turbulentos deste período tão relevante da humanidade, suas principais mentes, ocorridos, e eventos.
                    </p>
                </div>
                <div className={styles.card4}>
                    <p className={styles.cardTitle}>HISTÓRIA DA FILOSOFIA</p>
                    <p className={styles.cardDescription}>
                        Conheça a história do pensamento humano, desde a origem dos seus maiores questionamentos, até a sua evolução, plenitude, e também sua regressão, com as mais distintas correntes de pensamento já tidas pelo ser humano.
                    </p>
                </div>
                <div className={styles.card5}>
                    <p className={styles.cardTitle}>IDADE MODERNA</p>
                    <p className={styles.cardDescription}>
                        Um dos períodos mais transformadores e turbulentos da história, repleto de revoluções e ampliação de novas correntes ideológicas. Conheça as suas causas, e também as suas consequências presentes nos dias atuais.
                    </p>
                </div>
                <div className={styles.card6}>
                    <p className={styles.cardTitle}>SEGUNDA GUERRA MUNDIAL</p>
                    <p className={styles.cardDescription}>
                        Um dos piores conflitos que a humanidade já testemunhou. Conheça os motivos que a fizeram acontecer, e a história por trás de seus principais líderes e suas ideias.
                    </p>
                </div>
            </Container>
        </>
    )
}

export default CardsSection