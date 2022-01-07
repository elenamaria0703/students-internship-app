import React from "react";
import {FaClock, FaDollarSign, FaMapMarkedAlt, FaUsers} from 'react-icons/fa';
import {Badge, Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import {InternshipProps} from "./InternshipProps";

type onTitleClickFn = () => void;
interface internshipComponentProps extends InternshipProps{
    onTitleClick: onTitleClickFn
}

function InternshipComponent( {onTitleClick, ...props}: internshipComponentProps ) {
    return(
        <Card className={"mt-3"}>
            <Card.Body>
                <Row>
                    <Col md={10}>
                        <Card.Title>
                            <Card.Link href={"#"} onClick={onTitleClick} className={"text-decoration-none text-dark"}>
                                {props.title} {props.type && <Badge pill bg={"secondary"}>{props.type}</Badge>}
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
                        <Button> Apply Now</Button>
                        <div className={"fw-lighter small text-muted"}><FaUsers/>{props.candidates?.length && props.candidates.length> 0 ? ` ${props.candidates.length} candidates` : ' No candidates yet'}</div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className={"bg-transparent"}>
                <Card.Link href={"#"} className={"text-dark text-decoration-none"}>Update</Card.Link>
                <Card.Link href={"#"} className={"text-dark text-decoration-none"}>Delete</Card.Link>
            </Card.Footer>
        </Card>
    )
}
export default InternshipComponent