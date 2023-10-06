"use client";

import { Form, InputGroup, FloatingLabel, Button } from "react-bootstrap";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import photo1 from "@/public/images/categoriespermis.jpg";
import view from "@/public/icons/view.png";
import google from "@/public/icons/google.png";
import { showPassword } from "../libs/utils";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

interface SignInProps {
  isSignIn: boolean;
  state: (enabled: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ isSignIn, state }) => {
  const router = useRouter();
  const [typePasswordInput, setTypePasswordInput] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("En route !");
        router.refresh();
      }

      if (callback?.error) {
        console.log(callback.error);
        toast.error(callback.error);
      }
    });
  };

  return (
    <div
      className={`${
        isSignIn
          ? "sign active-sign"
          : "disabled-sign inactive-sign inactive-sign-2"
      } `}
    >
      {isSignIn && (
        <>
          <div className="sign-text">
            <h1 style={{ margin: "20px 0px" }}>Se Connecter</h1>
            <Form>
              <FloatingLabel label="Adresse e-mail" className="mb-3">
                <Input
                  id="email"
                  type="text"
                  register={register}
                  errors={errors}
                  required
                />
              </FloatingLabel>
              <InputGroup className="mb-3">
                <FloatingLabel label="Mot de passe">
                  <Input
                    id="paffwqsdsrd"
                    type={typePasswordInput}
                    register={register}
                    errors={errors}
                    required
                  />
                </FloatingLabel>
                <InputGroup.Text id="basic-addon1">
                  <Image
                    onClick={(e) =>
                      showPassword(e, typePasswordInput, setTypePasswordInput)
                    }
                    className="password-eye"
                    src={view}
                    alt="password-eye"
                    style={{ width: "auto" }}
                  />
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className="errorzone" />
            </Form>
            <div className="intro-buttons">
              <Button
                className="btn-10color"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Se connecter
              </Button>
              <CustomButton
                label="Continuer avec Google"
                icon={google}
                onClick={() => signIn("google")}
              />
            </div>
            <hr />
            <div className="intro-buttons">
              <Button className="btn-30color" onClick={() => state(!isSignIn)}>
                Pas Encore Inscrit ? S&apos;Inscrire
              </Button>
              <Button
                className="btn-30color"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Retour à la page d&apos;accueil
              </Button>
              <Button
                className="btn-30color"
                onClick={() => {
                  window.location.href = "/forgot-password";
                }}
              >
                J&apos;ai oublié mon mot de passe
              </Button>
            </div>
          </div>
          <div className="intro-photo">
            <Image src={photo1} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
