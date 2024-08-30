import { Button } from "react-bootstrap";
import './header.css';

interface HeaderLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const HeaderLoggedOutView = ({ onSignUpClicked, onLoginClicked }: HeaderLoggedOutViewProps) => {
    return (
        <><div className="header-logged-out-view">
            <Button onClick={onLoginClicked} className="btn-outline" style={{ marginRight: '10px' }}>Log In</Button> 
            <Button onClick={onSignUpClicked} className="btn">Sign Up</Button>
            </div>
        </>
    );
}

export default HeaderLoggedOutView;