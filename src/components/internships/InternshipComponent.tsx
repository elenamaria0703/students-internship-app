import React, { useContext } from "react";
import {FaClock, FaDollarSign, FaMapMarkedAlt, FaUsers} from 'react-icons/fa';
import {Badge, Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import {InternshipProps} from "./InternshipProps";
import { AccountContext } from "../../providers/AccountProvider";
import { RegistrationType } from "../auth/AuthModal";

type onClickFn = () => void;
interface internshipComponentProps extends InternshipProps{
    onTitleClick: onClickFn,
    onUpdateClick: onClickFn,
    onDeleteClick: onClickFn,
    onApplyClick: onClickFn
}

function InternshipComponent( {onTitleClick, onUpdateClick, onDeleteClick, onApplyClick, ...props}: internshipComponentProps ) {
    const { userId, userType} = useContext(AccountContext);

    function ShowApplyButton(){
       return userType == RegistrationType.STUDENT && (props.allStudents?.length == 0 || props.allStudents?.find(id => id === userId) == -1)
    }
    return(
        <Card className={"mt-3"}>
            <Card.Body>
                <Row>
                    <Col md={10}>
                        <Card.Title>
                            <Card.Link href={"#"} onClick={onTitleClick} className={"text-decoration-none text-dark"}>
                                {props.title}
                                {props.type && <Badge className={"mx-1"} pill bg={"secondary"}>{props.type}</Badge>}
                                {props.domain && <Badge className={"mx-2"} pill bg={"secondary"}>{props.domain}</Badge>}
                            </Card.Link>
                        </Card.Title>
                        <Card.Subtitle className={"text-muted"}>
                            <Row>
                                <Col md={2} className={"mx-1"}><FaMapMarkedAlt className={"mx-1"}/>{props.location || ' - '}</Col>
                            <Col md={2} className={"mx-1"}><FaClock className={"mx-1"}/>{props.duration || ' - '}</Col>
                            <Col className={"mx-1"}><FaDollarSign className={"mx-1"}/>{props.salary || ' - '}</Col>
                            </Row>
                        </Card.Subtitle>
                    </Col>
                    <Col md={2} className={"my-auto text-center"}>
                        {ShowApplyButton() && <Button onClick={onApplyClick}> Apply Now</Button>}
                        {!ShowApplyButton() && userId && !(userType == RegistrationType.COMPANY) && <Button disabled> Already Registered</Button>}
                        {userId && <div className={"fw-lighter small text-muted"}><FaUsers/>{props.allStudents?.length && props.allStudents.length> 0 ? ` ${props.allStudents.length} candidates` : ' No candidates yet'}</div>}
                    </Col>
                </Row>
            </Card.Body>
            {userType == RegistrationType.COMPANY && <Card.Footer className={"bg-transparent"}>
                <Card.Link href={"#"} onClick={onUpdateClick} className={"text-dark text-decoration-none"}>Update</Card.Link>
                <Card.Link href={"#"} onClick={onDeleteClick} className={"text-dark text-decoration-none"}>Delete</Card.Link>
            </Card.Footer>}
        </Card>
    )
}
export default InternshipComponent