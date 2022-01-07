import React, {useState} from "react";
import {Container, Row} from "react-bootstrap";
import InternshipComponent from "./InternshipComponent";
import InternshipDetailsModal from "./InternshipDetailsModal";

const InternshipsRootComponent: React.FC = () =>{
    const [modalState, setModalState] = useState({
        showModal: false,
        internship: {}
    });

    const openModalWithInternship = (internshipId: any) => {
        setModalState({
            ...modalState,
            showModal: true,
            internship: {title: internshipId.toString()}
        })
    }

   return (
       <Container className={"mt-2"}>
           <Container>
               {[...Array(5)].map((e, i) => <InternshipComponent onTitleClick={() => {
                   openModalWithInternship(i)
               }}/>)}
           </Container>
           <InternshipDetailsModal show={modalState.showModal} internship={modalState.internship} onHide={() => setModalState({...modalState, showModal: false})}/>
       </Container>
   )
}
export default InternshipsRootComponent