"use client";

import { Col, Row } from "react-bootstrap";
import ThemeToggler from "./ThemeToggler";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
      <footer className="">
        <p style={{ fontSize: "12px" }}>
          Copyright - apprentissagedelaconduite - {year} - Si vous avez des
          suggestions d&apos;articles n&apos;hésitez pas à me contacter.
        </p>
        <ThemeToggler />
      </footer>
  );
};

export default Footer;
