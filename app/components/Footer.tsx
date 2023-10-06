"use client";

import { Col, Row } from "react-bootstrap";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer-wrap">
      <footer className="footer">
        <Row>
          <p>
            Copyright - apprentissagedelaconduite.fr - {year} - Si vous avez des
            suggestions d&apos;articles n&apos;hésitez pas à me contacter.
          </p>
        </Row>
      </footer>
    </div>
  );
};

export default Footer;
