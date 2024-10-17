import { Button } from "primereact/button";

function LoginModal({ setLoginModalVisible }) {

    const turnLoginModalOff = () => {
        setLoginModalVisible(false)
    }

    return(
        <div className="login-modal">
            <p>This is the login modal</p>
            <Button label="Login"/>
            <Button label="Cancel" onClick={turnLoginModalOff}/>
            <Button label="Sign Up"/>
        </div>
    )
}
export default LoginModal;