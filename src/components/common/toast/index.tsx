import { Toast, ToastBody } from "reactstrap"

interface props {
    isOpen:  boolean
    message: string
    color:   string
}

const ToastComponent = function ({isOpen, message, color}: props)  {
    return(
        <>
            <Toast className={`${color} text-white fixed-top ms-auto mt-3`} isOpen={isOpen}>
                <ToastBody className="text-dark fw-bold text-center">
                    {message}
                </ToastBody>
            </Toast>
        </>
    )
}

export default ToastComponent