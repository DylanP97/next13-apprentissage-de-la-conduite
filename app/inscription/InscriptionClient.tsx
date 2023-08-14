'use client'

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonBootstrap from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css";
import { FloatingLabel, InputGroup } from "react-bootstrap";
import axios from "axios";
import photo1 from "@/public/images/retroviseur.jpg";
import view from "@/public/icons/view.png";
import Button from "../components/Button";
import { showPassword } from "../libs/utils";
import googleIcon from "@/public/icons/google.png";
import Image from "next/image";

import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FieldValues } from 'react-hook-form';

import { signIn } from "next-auth/react";
import Input from "../components/Input";

function SignUp() {
    const [errorMessages, setErrorMessages] = useState({ email: "", password: "" })

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/user/signup', data)
            .then(() => {
                toast.success("Merci pour votre demande d'inscription !");
            })
            .catch((error) => {
                if (error.response) {
                    const errorMessage = error.response.data;

                    setErrorMessages({
                        email: errorMessage.email || '',
                        password: errorMessage.password || '',
                    });
                } else {
                    console.error("Il y a eu une erreur:", error);
                    toast.error("Il y a eu une erreur. Veuillez essayez à nouveau.");
                }
            });
    }   


    return (
        <div className='intro'>
            <Col className="sign-text" md="6" xl="6">
                <h1 style={{ margin: "20px 0px" }}>S&apos;Inscrire</h1>
                <Form>
                    <Row>
                        <Form.Group as={Col} md="6">
                            <FloatingLabel label="Prénom" className="mb-3">
                                <Input
                                    id="firstName"
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <FloatingLabel label="Nom" className="mb-3">
                                <Input
                                    id="lastName"
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Adresse email">
                            <Input
                                id="email"
                                register={register}
                                errors={errors}
                                required
                            />
                        </FloatingLabel>
                        <Form.Text className="email error">
                            {errorMessages.email && <span className="error-message">{errorMessages.email}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <InputGroup className="mb-3">
                                <FloatingLabel label="Mot de passe">
                                    <Input
                                        id="password"
                                        type="password"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                </FloatingLabel>
                                <InputGroup.Text id="basic-addon1">
                                    <Image
                                        onClick={showPassword}
                                        className="password-eye"
                                        src={view}
                                        alt={`showingpassword`}
                                        style={{ width: "auto" }}
                                    />
                                </InputGroup.Text>
                            </InputGroup>
                            <Form.Text className="email error">
                                {errorMessages.email && <span className="error-message">{errorMessages.password}</span>}
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
                    <ButtonBootstrap
                        className="btn-10color"
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        id="checkout_btn"
                    >
                        Envoyé ma demande d&apos;inscription
                    </ButtonBootstrap>
                    <Button
                        label="Continuer avec Google"
                        icon={googleIcon}
                        onClick={() => signIn('google')}
                    />
                </div>
                <hr />
                <div className="intro-buttons">
                    <ButtonBootstrap className="btn-30color" onClick={() => { window.location.href = "/connexion" }}>
                        Vous avez déjà un compte ? Connectez-vous !
                    </ButtonBootstrap>
                    <ButtonBootstrap className="btn-30color" onClick={() => { window.location.href = "/" }}>
                        Retour à l&apos;accueil
                    </ButtonBootstrap>
                </div>
                <br />
            </Col>
            <Col className="intro-photo" md="6" xl="6">
                <Image
                    src={photo1}
                    alt={`photobg1`}
                />
            </Col>
        </div>
    );
}

export default SignUp;