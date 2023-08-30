
'use client'

import { Col, Form, InputGroup, FloatingLabel, Button } from "react-bootstrap";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import photo1 from "@/public/images/categoriespermis.jpg";
import view from "@/public/icons/view.png";
import { showPassword } from "../libs/utils";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FieldValues } from 'react-hook-form';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import google from "@/public/icons/google.png";

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

                    console.log(callback)

                    if (callback?.ok) {
                        toast.success('En route !');
                        router.refresh();
                    }

                    if (callback?.error) {
                        console.log(callback.error)
                        toast.error(callback.error);
                    }
                });
        }

    return (
        <div className="intro">
            <Col className="sign-text">
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
                    <Button
                        className="btn-10color"
                        type="submit"
                        href=""
                        onClick={handleSubmit(onSubmit)}
                    >
                        Se connecter
                    </Button>
                    <CustomButton
                        label="Continuer avec Google"
                        icon={google}
                        onClick={() => signIn('google')}
                    />
                </div>
                <hr />
                <div className="intro-buttons">
                    <Button
                        className="btn-30color"
                        href=""
                        onClick={() => {
                            window.location.href = "/inscription";
                        }}
                    >
                        Pas Encore Inscrit ? S&apos;Inscrire
                    </Button>
                    <Button
                        className="btn-30color"
                        href=""
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Retour à la page d&apos;accueil
                    </Button>
                    <Button
                        className="btn-30color"
                        href=""
                        onClick={() => {
                            window.location.href = "/forgot-password";
                        }}
                    >
                        J&apos;ai oublié mon mot de passe
                    </Button>
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