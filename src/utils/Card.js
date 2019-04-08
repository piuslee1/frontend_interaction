import React from 'react';
import { Card, CardBody } from 'reactstrap';

function RoundCard(props) {
  return (
    <Card {...props} style={{borderRadius: "15px"}}>
      {props.children}
    </Card>
  );
}

function MakeCardBody(props) {
  return (
    <CardBody>
      <h1>{props.body.title}</h1>
      <h4>{props.body.subtitle}</h4>
      <p>{props.body.text}</p>
    </CardBody>
  );
}

function MakeCard(props) {
  return (
    <RoundCard>
      {props.children}
      <MakeCardBody body={props.body}/>
    </RoundCard>
  )
}

export default MakeCard;
