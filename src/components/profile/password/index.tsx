import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { useState, useEffect, FormEvent} from 'react'
import profileService from "@/services/profileService";
import ToastComponent from "@/components/common/toast";

const PasswordForm= function () {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [color, setColor] =   useState('')
    const [toastOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()    =>  {
        profileService.fetchCurrent().then((password) =>    {
            setCurrentPassword(password.currentPassword)
            setNewPassword(password.newPassword)
        })
    }, [])

    const handlePasswordUpdate = async function(event: FormEvent<HTMLFormElement>)  {
        event.preventDefault()

        //Verificação entre as senhas inseridas//
        if  (newPassword != confirmNewPassword)   {
            setToastIsOpen(true)
            setErrorMessage("Senha e confirmação diferentes")
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3);
            
            return
        }
        //Verificação entre a senha antiga e nova//
        if  (currentPassword === newPassword) {
            setToastIsOpen(true)
            setErrorMessage("A senha atual é a mesma que a antiga.")
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3);

            return
        }

        const response  = await profileService.passwordUpdate({
            currentPassword, newPassword
        })

        if(response === 204)    {
            setToastIsOpen(true)
            setErrorMessage("Senha alterada com sucesso.")
            setColor('bg-success')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3);

            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        }

        if  (response === 400)  {
            setToastIsOpen(true)
            setErrorMessage("Senha atual incorreta.")
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3);
        }
    }

    return (
        <>
            <Form className={styles.form} onSubmit={handlePasswordUpdate}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label className={styles.label} for="currentPassword">
                            SENHA ATUAL
                        </Label>
                        <Input
                            name="currentPassword"
                            type="password"
                            id="currentPassword"
                            placeholder="******"
                            required
                            maxLength={12}
                            value={currentPassword}
                            onChange={(event) => {setCurrentPassword(event.currentTarget.value)}}
                            className={styles.input}
                        />
                    </FormGroup>
                </div>
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label className={styles.label} for="newPassword">
                            NOVA SENHA
                        </Label>
                        <Input
                            name="newPassword"
                            type="password"
                            id="newPassword"
                            placeholder="******"
                            required
                            value={newPassword}
                            onChange={(event) => {setNewPassword(event.currentTarget.value)}}
                            className={styles.inputFlex}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label} for="confirmNewPassword">
                            CONFIRMAR NOVA SENHA
                        </Label>
                        <Input
                            name="confirmNewPassword"
                            type="password"
                            id="confirmNewPassword"
                            placeholder="******"
                            required
                            value={confirmNewPassword}
                            onChange={(event) => {setConfirmNewPassword(event.currentTarget.value)}}
                            className={styles.inputFlex}
                        />
                    </FormGroup>
                    <Button className={styles.formBtn} outline type="submit">
                        Salvar Alterações
                    </Button>
                </div>
            </Form>
            <ToastComponent color={color} isOpen={toastOpen} message={errorMessage} />
        </>
    )
};

export default PasswordForm;