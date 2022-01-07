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
                                Internship Title <Badge pill bg={"secondary"}>Type</Badge>
                            </Card.Link>
                        </Card.Title>
                        <Card.Subtitle className={"text-muted"}>
                            <span className={"mx-1"}><FaMapMarkedAlt/> Location</span>
                            <span className={"mx-1"}><FaClock/> Duration</span>
                            <span className={"mx-1"}><FaDollarSign/> Salary</span>
                        </Card.Subtitle>
                    </Col>
                    <Col md={2} className={"my-auto text-center"}>
                        <Button> Apply Now</Button>
                        <div className={"fw-lighter small text-muted"}><FaUsers/> 80 candidates</div>
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