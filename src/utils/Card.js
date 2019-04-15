import React from 'react';
import { Card, CardBody } from 'reactstrap';
// import YoutubePlayer from 'react-player/lib/players/YouTube';

function RoundCard(props) {
  return (
    <Card {...props} style={{
      borderRadius: "15px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    }}>
      {props.children}
    </Card>
  );
}

function MakeCardBody(props) {
  if (!props.body) {
    return <CardBody/>;
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
    <RoundCard>
      {props.children}
      <MakeCardBody body={props.body}/>
    </RoundCard>
  );
}

// function RoundYoutubePlayer(props) {
//   return <YoutubePlayer {...props} style={
//     {
//       borderTopLeftRadius: "15px",
//       borderTopRightRadius: "15px",
//       overflow: "hidden",
//       position: "relative",
//       zIndex: 1
//     }
//   }/>;
// }

export default MakeCard;
