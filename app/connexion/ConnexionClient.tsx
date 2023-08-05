
'use client'

import { Col, Form, InputGroup, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import photo1 from "@/public/images/categoriespermis.jpg";
import view from "@/public/icons/view.png";
import ButtonBootstrap from "react-bootstrap/Button"
import Button from "../components/Button";
import getCurrentUser from "@/app/actions/getCurrentUser";

import { showPassword } from "../libs/utils";
import Image from "next/image";

import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FieldValues } from 'react-hook-form';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import { interfaceIcons } from "@/public/interface";

function ConnexionClient() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> =
        (data) => {

            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.ok) {
                        toast.success('En route !');
                        router.refresh();
                    }

                    if (callback?.error) {
                        // console.log(callback.error)
                        toast.error("Il y a eu une erreur !");
                    }
                });
        }

    return (
        <div className="intro">
            <Col className="sign-text" md="6" xl="6">
                <h1 style={{ margin: "20px 0px" }}>Se Connecter</h1>
                <Form>
                    <FloatingLabel
                        label="Adresse e-mail"
                        className="mb-3"
                    >
                        <Input
                            id="email"
                            register={register}
                            errors={errors}
                            required
                        />
                    </FloatingLabel>
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
                                alt="password-eye"
                                style={{ width: "auto" }}
                            />
                        </InputGroup.Text>
                    </InputGroup>
                    <Form.Text className="errorzone" />
                    <hr />
                </Form>
                <div className='intro-buttons'>
                    <ButtonBootstrap
                        className="btn-10color"
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Se connecter
                    </ButtonBootstrap>
                    <Button
                        label="Continuer avec Google"
                        icon={interfaceIcons['google']}
                        onClick={() => signIn('google')}
                    />
                </div>
                <hr />
                <div className="intro-buttons">
                    <ButtonBootstrap
                        className="btn-30color"
                        onClick={() => {
                            window.location.href = "/inscription";
                        }}
                    >
                        Pas Encore Inscrit ? S&apos;Inscrire
                    </ButtonBootstrap>
                    <ButtonBootstrap
                        className="btn-30color"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Retour à la page d&apos;accueil
                    </ButtonBootstrap>
                    <ButtonBootstrap
                        className="btn-30color"
                        onClick={() => {
                            window.location.href = "/forgot-password";
                        }}
                    >
                        J&apos;ai oublié mon mot de passe
                    </ButtonBootstrap>
                </div>
            </Col>
            <Col className="intro-photo" md="6" xl="6">
                <Image
                    src={photo1}
                    alt=""
                />
            </Col>
        </div>
    );
}

export default ConnexionClient;