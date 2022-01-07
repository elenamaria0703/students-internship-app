import {Alert, Modal} from "react-bootstrap";
import {InternshipProps} from "./InternshipProps";
import React from "react";

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
                        { props.internship?.title ? "Internship Title" + props.internship.title : "No internship selected"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </div>
        </Modal>
    )
}
export default InternshipDetailsModal