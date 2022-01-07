import {Alert, Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {InternshipProps} from "./InternshipProps";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {InternshipContext} from "../../providers/InternshipProvider";

type hideFn = () => void;
interface internshipModalProps{
    show: boolean,
    onHide: hideFn,
    internship?: InternshipProps
}
function InternshipFormModal(props: internshipModalProps) {
    const { saving, savingError, saveInternship } = useContext(InternshipContext)

    const [title, setTitle] = useState(props.internship?.title || "")
    const [description, setDescription] = useState(props.internship?.description || "")
    const [domain, setDomain] = useState(props.internship?.domain || "")
    const [location, setLocation] = useState(props.internship?.location || "")
    const [type, setType] = useState(props.internship?.type || "On-Site")
    const [salary, setSalary] = useState(props.internship?.salary || 0)
    const [duration, setDuration] = useState(props.internship?.duration || 120)

    useEffect(() => {
        setTitle(props.internship?.title || "")
        setDescription(props.internship?.description || "")
        setDomain(props.internship?.domain || "")
        setLocation(props.internship?.location || "")
        setType(props.internship?.type || "On-Site")
        setSalary(props.internship?.salary || 0)
        setDuration(props.internship?.duration || 120)
    }, [props.internship])

    const processSave = (event: FormEvent) => {
        event.preventDefault()
        let newInternship = {
            _id: props.internship?._id,
            title: title,
            description: description,
            domain: domain,
            location: location,
            type: type,
            salary: salary,
            duration: duration
        }
        saveInternship && saveInternship(newInternship).then(() => props.onHide())
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title className={"fs-5"} id="contained-modal-title-vcenter">
                        {props.internship?.title ? "Update internship offer" : "New Internship Offer"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={"small"} onSubmit={(event) => processSave(event)}>
                        <Form.Group>
                            <Form.Label>Title*</Form.Label>
                            <Form.Control required placeholder="Internship's Title" value={title} onChange={(event) => setTitle(event.target.value || '')} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type*</Form.Label>
                            <Form.Select value={type} onChange={(event) => setType(event.target.value || '')} >
                                <option>On-Site</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Domain*</Form.Label>
                            <Form.Control required placeholder="Domain" value={domain} onChange={(event) => setDomain(event.target.value || '')} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <textarea className={"form-control"} rows={5} value={description} onChange={(event) => setDescription(event.target.value || '')}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control placeholder="Main Location" value={location} onChange={(event) => setLocation(event.target.value || '')} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" placeholder="Salary" value={salary} onChange={(event) => setSalary(parseInt(event.target.value) || 0)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="number" placeholder="Duration" value={duration} onChange={(event) => setDuration(parseInt(event.target.value) || 0)} />
                        </Form.Group>
                        <Button className={"my-2"} type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    )
}
export default InternshipFormModal