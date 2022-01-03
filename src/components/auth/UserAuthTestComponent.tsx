import { useContext } from "react";
import { Toast } from "react-bootstrap";
import { AccountContext } from "../../providers/AccountProvider";
//This component is just for test
//Remove this after full implementation
const UserAuthTestComponent: React.FC =()=>{
  const {userId} = useContext(AccountContext);
  return(
    <div>
      {userId ? <Toast bg="success">
        <Toast.Header>
          <strong className="me-auto">Auth Status</strong>
        </Toast.Header>
        <Toast.Body>Hello, {userId}! You have succesfully logged in.</Toast.Body>
      </Toast>
      :
      <Toast bg="secondary">
        <Toast.Header>
          <strong className="me-auto">Auth Status</strong>
        </Toast.Header>
        <Toast.Body>No user is currently signed in!</Toast.Body>
      </Toast>}
    </div>
  );
}
export default UserAuthTestComponent;