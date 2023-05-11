import HeaderGeneric from "@/components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";

const Register = function () {
    return (
        <>
            <Head>
                <title>Veritas - Registro</title>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
                <meta name="description" content="Registre-se na melhor plataforma de erudição em história e filosofia."/>
            </Head>
            <main>
                <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Logar"   />
            </main>
        </>
    );
};

export default Register;