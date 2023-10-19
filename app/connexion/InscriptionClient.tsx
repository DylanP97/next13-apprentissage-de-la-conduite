"use client";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Input from "../components/Input";
import { FloatingLabel, InputGroup, Button } from "react-bootstrap";
import photo1 from "@/public/images/retroviseur.jpg";
import view from "@/public/icons/view.png";
import CustomButton from "../components/Button";
import { showPassword } from "../libs/utils";
import googleIcon from "@/public/icons/google.png";

import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";

interface SignUpProps {
  isSignIn: boolean;
  state: any;
}

const SignUp: React.FC<SignUpProps> = ({ isSignIn, state }) => {
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [typePasswordInput, setTypePasswordInput] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/user/signup", data)
      .then(() => {
        toast.success(
          "Merci pour votre demande d'inscription, vous pouvez désormais vous connectez !",
        );
        setInterval(() => {
          state(!isSignIn);
        }, 3000);
      })

      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data;

          setErrorMessages({
            email: errorMessage.email || "",
            password: errorMessage.password || "",
          });
        } else {
          console.error("Il y a eu une erreur:", error);
          toast.error("Il y a eu une erreur. Veuillez essayez à nouveau.");
        }
      });
  };

  return (
    <div
      className={`${
        isSignIn
          ? "disabled-sign inactive-sign inactive-sign-1"
          : "sign active-sign"
      }`}
    >
      {!isSignIn && (
        <>
          <div className="intro-photo">
            <Image src={photo1} alt={`photobg1`} />
          </div>
          <div className="sign-text">
            <h1 style={{ margin: "20px 0px" }}>S&apos;Inscrire</h1>
            <Form>
              <Row>
                <Form.Group>
                  <FloatingLabel label="Prénom" className="mb-3">
                    <Input
                      id="firstName"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel label="Nom" className="mb-3">
                    <Input
                      id="lastName"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Adresse email">
                    <Input
                      id="email"
                      type="text"
                      register={register}
                      errors={errors}
                      required
                    />
                  </FloatingLabel>
                  <Form.Text className="email error">
                    {errorMessages.email && (
                      <span className="error-message">
                        {errorMessages.email}
                      </span>
                    )}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <InputGroup className="mb-3">
                    <FloatingLabel label="Mot de passe">
                      <Input
                        id="password"
                        type={typePasswordInput}
                        register={register}
                        errors={errors}
                        required
                      />
                    </FloatingLabel>
                    <InputGroup.Text id="basic-addon1">
                      <Image
                        onClick={(e) =>
                          showPassword(
                            e,
                            typePasswordInput,
                            setTypePasswordInput,
                          )
                        }
                        className="password-eye"
                        src={view}
                        alt={`showingpassword`}
                        style={{ width: "auto" }}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Text className="email error">
                    {errorMessages.email && (
                      <span className="error-message">
                        {errorMessages.password}
                      </span>
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Text className="password error"></Form.Text>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="terms"
                  label="J'accepte les condition générales"
                />
                <Form.Text className="terms error"></Form.Text>
              </Form.Group>
              <Form.Text className="errorzone" />
            </Form>
            <div className="intro-buttons">
              <Button
                className="btn-10color"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                id="checkout_btn"
              >
                Envoyé ma demande d&apos;inscription
              </Button>
              <CustomButton
                label="Continuer avec Google"
                icon={googleIcon}
                onClick={() => signIn("google")}
              />
            </div>
            <hr />
            <div className="intro-buttons">
              <Button
                className="btn-30color"
                onClick={() => {
                  state(!isSignIn);
                }}
              >
                Vous avez déjà un compte ? Connectez-vous !
              </Button>
              <Button
                className="btn-30color"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Retour à l&apos;accueil
              </Button>
            </div>
            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
