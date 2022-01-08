import React, {useContext, useState} from "react";
import {Button, Card, Col, Container, Pagination, Row} from "react-bootstrap";
import InternshipComponent from "./InternshipComponent";
import InternshipDetailsModal from "./InternshipDetailsModal";
import {InternshipContext} from "../../providers/InternshipProvider";
import {InternshipProps} from "./InternshipProps";
import InternshipFormModal from "./InternshipFormModal";

interface InternshipsRootInterface{
    showModal: boolean,
    showFormModal: boolean
    internship: InternshipProps|undefined
}
const initialState: InternshipsRootInterface = {
    showModal: false,
    showFormModal: false,
    internship: undefined
}
const InternshipsRootComponent: React.FC = () =>{
    const {internships} = useContext(InternshipContext)
    const [modalState, setModalState] = useState(initialState);

    const openModalWithInternship = (internshipId: number|undefined, showModal: boolean, showFormModal: boolean) => {
        let internship = internshipId ? internships?.find(it => it.id === internshipId) : undefined
        setModalState({
            ...modalState,
            showModal: showModal,
            showFormModal: showFormModal,
            internship: internship
        })
    }

   return (
       <Container className={"mt-2 mb-5"}>
           <Row>
               <Col><h2>All Internships</h2></Col>
               <Col className={"text-end my-auto"}><Button onClick={() =>{openModalWithInternship(undefined, false, true)}}>New Internship Offer</Button></Col>
           </Row>
           <hr/>
           <Row>
               {internships?.length && internships.length > 0 ? internships.map((e, i) =>
                   <InternshipComponent
                       key={e.id}
                       title={e.title}
                       domain={e.domain}
                       location={e.location}
                       duration={e.duration}
                       salary={e.salary}
                       type={e.type}
                       onTitleClick={() => {
                           openModalWithInternship(e.id, true, false)
                       }}
                       onUpdateClick={() => {
                           openModalWithInternship(e.id, false, true)
                       }
                       }/>)
                   :
                   <h5 className={"my-2"}>No internships to display</h5>
               }
           </Row>
           <InternshipDetailsModal show={modalState.showModal} internship={modalState.internship} onHide={() => setModalState({...modalState, showModal: false})}/>
           <InternshipFormModal show={modalState.showFormModal} internship={modalState.internship} onHide={()=>setModalState({...modalState, showFormModal: false})}/>
       </Container>
   )
}
export default InternshipsRootComponent