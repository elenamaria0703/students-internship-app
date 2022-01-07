import {Alert, Badge, Card, Col, Modal, Row} from "react-bootstrap";
import {InternshipProps} from "./InternshipProps";
import React from "react";
import {FaClock, FaDollarSign, FaMapMarkedAlt} from "react-icons/fa";

type hideFn = () => void;
interface internshipModalProps{
    show: boolean,
    onHide: hideFn,
    internship?: InternshipProps
}
function InternshipDetailsModal(props: internshipModalProps) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.internship?.title}
                        {props.internship?.type && <Badge pill bg={"secondary"} className={"mx-1"}>{props.internship.type}</Badge>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className={"text-muted text-center"}>
                        <Col><FaMapMarkedAlt/> {props.internship?.location || " - "}</Col>
                        <Col><FaClock/> {props.internship?.duration || " - "}</Col>
                        <Col><FaDollarSign/> {props.internship?.salary || " - "}</Col>
                    </Row>
                    {props.internship?.description && <Row className={"my-2 mx-1 fs-6"}>{props.internship.description}</Row>}
                </Modal.Body>
            </div>
        </Modal>
    )
}
export default InternshipDetailsModal