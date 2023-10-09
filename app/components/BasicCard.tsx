"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { MDBModal, MDBModalBody } from "mdb-react-ui-kit";
import { dateParser, getSubscriptionLabel } from "@/app/libs/utils";
import Tooltip from "./Tooltip";
import CardEditionStep from "./CardEditionStep";
import editWhite from "@/public/icons/file-edit-white.png";
import eyeWhite from "@/public/icons/eye-white.png";
import eyeCrossWhite from "@/public/icons/eye-crossed-out.png";
import linkWhite from "@/public/icons/external-link.png";
import trashWhite from "@/public/icons/trash-white.png";
import plusWhite from "@/public/icons/plus-white.png";
import adminPrimary from "@/public/icons/close-white.png";
import adminWhite from "@/public/icons/admin-white.png";
import blockUser from "@/public/icons/block-user.png";
import checkUserWhite from "@/public/icons/check-user-white.png";
import { useTheme } from "../providers/ThemeProvider";

interface BasicCardProps {
  data?: any;
  type: string;
  toggleMethod?: any;
  toggleMethod2?: any;
  deleteMethod?: any;
}


const BasicCard: React.FC<BasicCardProps> = ({
  type,
  data,
  toggleMethod,
  toggleMethod2,
  deleteMethod,
}) => {
  const [edition, setEdition] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleNewQuestionClick = () => {
    setEdition(true);
  };

  const saveResponse = () => {
    setEdition(false);
  };

  const cancelEdition = () => {
    setEdition(false);
  };

  const theme = useTheme();

  const renderUserCard = () => (
    <div className="blog-card">
      <div className="blog-card-title">
        <p>{data.name ? data.name : `${data.firstName} ${data.lastName}`}</p>
      </div>
      <div className="">
        <p>{data.email}</p>
        {!data.isAdmin ? (
          data.isAccepted ? (
            <p>Inscription validée</p>
          ) : (
            <p>Inscription non validée</p>
          )
        ) : null}
        {data.isAdmin ? (
          <p>Rôle Administrateur 👨🏻‍🔧</p>
        ) : (
          <p>{getSubscriptionLabel(data.subscriptionPlan)}</p>
        )}
      </div>
      <br />
      {isMobile && (
        <>
          {!data.isAccepted && (
            <Button
              onClick={() =>
                toggleMethod &&
                toggleMethod(
                  data.id,
                  data.isAccepted,
                  data.email,
                  data.firstName || data.name
                )
              }
            >
              {data.isAccepted
                ? "Désinscrire l'uitlisateur"
                : "Valider l'utilistateur"}
            </Button>
          )}
          <Button
            onClick={() =>
              toggleMethod2 && toggleMethod2(data.id, data.isAdmin)
            }
          >
            {data.isAdmin
              ? "Enlever rôle d'administrateur"
              : "Promouvoir administrateur"}
          </Button>
          <Button onClick={() => deleteMethod && deleteMethod(data.id)}>
            Supprimer l&apos;utilisateur
          </Button>
        </>
      )}
      <div className="blog-card-buttons">
        {!isMobile && !data.isAdmin && (
          <>
            <Tooltip
              message={`${
                data.isAccepted
                  ? "Désinscrire l'uitlisateur"
                  : "Valider l'inscription de l'utilistateur"
              }`}
            >
              <Image
                src={data.isAccepted ? blockUser : checkUserWhite}
                alt="accepted"
                className="icon"
                onClick={() =>
                  toggleMethod && toggleMethod(data.id, data.isAccepted)
                }
              />
            </Tooltip>
            <Tooltip
              message={`${
                data.isAdmin
                  ? "Enlever rôle d'administrateur"
                  : "Promouvoir au rôle d'administrateur"
              }`}
            >
              <Image
                src={data.isAdmin ? adminPrimary : adminWhite}
                alt="admin"
                className="icon"
                onClick={() =>
                  toggleMethod2 && toggleMethod2(data.id, data.isAdmin)
                }
              />
            </Tooltip>
            <Tooltip message="Supprimer l'utilisateur">
              <Image
                src={trashWhite}
                alt="trash"
                className="icon"
                onClick={() => deleteMethod && deleteMethod(data.id)}
              />
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );

  const renderCreateQuestionOpenCard = () => (
    <MDBModal tabIndex="-1" show={edition} setShow={setEdition}>
      <MDBModalBody>
        <div className="blog-card-edition">
          <div className="question-edition">
            <CardEditionStep
              isNewQuestion={true}
              cancelEdition={cancelEdition}
              saveResponse={saveResponse}
            />
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );

  const renderQuestionOpenCard = () => (
    <MDBModal tabIndex="-1" show={edition} setShow={setEdition}>
      <MDBModalBody>
        <div className="blog-card-edition">
          <div className="question-edition">
            <CardEditionStep
              isNewQuestion={false}
              cancelEdition={cancelEdition}
              data={data}
              id={data.id}
              saveResponse={saveResponse}
            />
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );

  const renderCreateQuestionCard = () => (
    <div className="blog-card new-question" onClick={handleNewQuestionClick}>
      <div className="question-edition">
        <Image
          src={plusWhite}
          alt=""
          className="big-plus"
          style={{ width: "100px", height: "auto" }}
        />
        <p>Ajouter une nouvelle question</p>
      </div>
    </div>
  );

  const renderQuestionCard = () => (
    <div className="blog-card">
      <div className="blog-card-title">
        <p>{data.question}</p>
      </div>
      <div className="blog-card-content">
        {data.answers.map((answer: any, index: number) => (
          <p key={index}>{answer}</p>
        ))}
        <br />
        <div className="blog-card-buttons">
          <Tooltip
            message={`Visibilité (Actuellement : ${
              data.published ? "Visible" : "Invisible"
            })`}
          >
            <Image
              src={data.published ? eyeWhite : eyeCrossWhite}
              alt="view"
              className="icon"
              onClick={() =>
                toggleMethod && toggleMethod(data.id, data.published)
              }
            />
          </Tooltip>
          <Tooltip message="Modifier la question">
            <Image
              src={editWhite}
              alt="view"
              className="icon"
              onClick={() => setEdition(!edition)}
            />
          </Tooltip>
          <Tooltip message="Supprimer la question">
            <Image
              src={trashWhite}
              alt="trash"
              className="icon"
              onClick={() => deleteMethod && deleteMethod(data.id)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );

  const renderArticleCard = () => (
    <div className="blog-card">
      <div className="blog-card-title">
        <p>{data.title}</p>
      </div>
      <div className="blog-card-content">
        <p>
          {data.tags.map((tag: any, index: number) => (
            <span key={tag + index}>#{tag}</span>
          ))}
        </p>
        <br />
        <p>Créer le {dateParser(data.createdAt)}</p>
        <p>Dernière modification le {dateParser(data.updatedAt)}</p>
        <br />
      </div>
      <div className="blog-card-buttons">
        <Tooltip
          message={`Visibilité (Actuellement : ${
            data.published ? "Visible" : "Invisible"
          })`}
        >
          <Image
            src={data.published ? eyeWhite : eyeCrossWhite}
            alt="view"
            className="icon"
            onClick={() =>
              toggleMethod && toggleMethod(data.id, data.published)
            }
          />
        </Tooltip>
        <Tooltip message="Voir l'article">
          <Image
            src={linkWhite}
            alt="link"
            className="icon"
            onClick={() => window.location.assign(`/article/${data.id}`)}
          />
        </Tooltip>
        <Tooltip message="Éditer l'article">
          <Image
            src={editWhite}
            alt="view"
            className="icon"
            onClick={() => window.location.assign(`/admin-edition/${data.id}`)}
          />
        </Tooltip>
        <Tooltip
          message="Supprimer"
          clicking={() => deleteMethod && deleteMethod(data.id)}
        >
          <Image src={trashWhite} alt="trash" className="icon" />
        </Tooltip>
      </div>
    </div>
  );

  switch (type) {
    case "user":
      return renderUserCard();
    case "createQuestion":
      return edition
        ? renderCreateQuestionOpenCard()
        : renderQuestionOpenCard();
    case "question":
      return edition ? renderCreateQuestionCard() : renderQuestionCard();
    case "article":
      return renderArticleCard();
    default:
      return null;
  }
};

export default BasicCard;
