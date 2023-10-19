"use client";

import { Col, Row } from "react-bootstrap";
import ThemeToggler from "./ThemeToggler";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div>
          <p>
            Copyright - apprentissagedelaconduite.fr - {year} - Si vous avez des
            suggestions d&apos;articles n&apos;hésitez pas à me contacter.
          </p>
        </div>
        <ThemeToggler />
      </footer>
    </div>
  );
};

export default Footer;
