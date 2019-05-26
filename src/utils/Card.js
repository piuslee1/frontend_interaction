import React from "react";
import posed from "react-pose";
import { CardBody } from "reactstrap";
import RoundCard from "./RoundCard";

function MakeCardBody(props) {
  if (props.body === undefined || props.body === null) {
    return null;
  }

  return (
    <CardBody>
      {props.body.title ? <h1>{props.body.title}</h1> : null}
      {props.body.subtitle ? <h4>{props.body.subtitle}</h4> : null}
      {props.body.text ? <p>{props.body.text}</p> : null}
    </CardBody>
  );
}

function MakeCard(props) {
  return (
    <RoundCard state={props.state}>
      {props.children}
      <MakeCardBody body={props.body} />
    </RoundCard>
  );
}

export default MakeCard;
