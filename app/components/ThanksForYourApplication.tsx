"use client";

import { Col } from "react-bootstrap";

const ThanksForYourApplication = () => {
  return (
    <Col className="sign-text" md="12" xl="12">
      <p style={{ fontSize: "26px", fontWeight: "600" }}>
        Merci pour votre demande d&apos;inscription.
      </p>
      <p>
        Nous allons examiner votre demande et vous tiendrons informé par email
        de son acceptation éventuelle.
      </p>
      <br />
      <hr />
    </Col>
  );
};

export default ThanksForYourApplication;
