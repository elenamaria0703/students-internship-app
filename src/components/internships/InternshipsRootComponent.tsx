import React, {useContext, useState} from "react";
import {Container, Row} from "react-bootstrap";
import InternshipComponent from "./InternshipComponent";
import InternshipDetailsModal from "./InternshipDetailsModal";
import {InternshipContext} from "../../providers/InternshipProvider";
import {InternshipProps} from "./InternshipProps";

interface InternshipsRootInterface{
    showModal: boolean,
    internship: InternshipProps|undefined
}
const initialState: InternshipsRootInterface = {
    showModal: false,
    internship: undefined
}
const InternshipsRootComponent: React.FC = () =>{
    const {internships} = useContext(InternshipContext)
    const [modalState, setModalState] = useState(initialState);

    const openModalWithInternship = (internshipId: number|undefined) => {
        let internship = internshipId ? internships?.find(it => it._id === internshipId) : undefined
        setModalState({
            ...modalState,
            showModal: true,
            internship: internship
        })
    }

   return (
       <Container className={"mt-2"}>
           <Container>
               {internships && internships.map((e, i) =>
                   <InternshipComponent
                       key={e._id}
                       title={e.title}
                       location={e.location}
                       duration={e.duration}
                       salary={e.salary}
                       type={e.type}
                       onTitleClick={() => {
                           openModalWithInternship(e._id)
                       }}/>)}
           </Container>
           <InternshipDetailsModal show={modalState.showModal} internship={modalState.internship} onHide={() => setModalState({...modalState, showModal: false})}/>
       </Container>
   )
}
export default InternshipsRootComponent