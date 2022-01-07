import React from "react";
import {Container, Row} from "react-bootstrap";
import InternshipComponent from "./InternshipComponent";

const InternshipsRootComponent: React.FC = () =>{
   return (
       <Container className={"mt-2"}>
           <InternshipComponent/>
           <InternshipComponent/>
       </Container>
   )
}
export default InternshipsRootComponent