"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { MDBModal, MDBModalBody } from "mdb-react-ui-kit";
import { dateParser, getSubscriptionLabel } from "@/app/libs/utils";
import Tooltip from "./Tooltip";
import CardEditionStep from "./CardEditionStep";
import editWhite from "@/public/icons/file-edit-white.png";
import editBlack from "@/public/icons/file-edit-black.png";
import eyeWhite from "@/public/icons/eye-white.png";
import eyeBlack from "@/public/icons/eye-black.png";
import eyeCrossBlack from "@/public/icons/eye-crossed-out-black.png";
import eyeCrossWhite from "@/public/icons/eye-crossed-out-white.png";
import linkWhite from "@/public/icons/external-link.png";
import linkBlack from "@/public/icons/external-link-black.png";
import trashWhite from "@/public/icons/trash-white.png";
import trashBlack from "@/public/icons/trash-black.png";
import plusWhite from "@/public/icons/plus-white.png";
import plusBlack from "@/public/icons/plus-black.png";
import closeWhite from "@/public/icons/close-white.png";
import closeBlack from "@/public/icons/close-black.png";
import adminWhite from "@/public/icons/admin-white.png";
import adminBlack from "@/public/icons/admin-black.png";
import blockUserWhite from "@/public/icons/block-user-white.png";
import blockUserBlack from "@/public/icons/block-user-black.png";
import checkUserWhite from "@/public/icons/check-user-white.png";
import checkUserBlack from "@/public/icons/check-user-black.png";
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
              message={`${data.isAccepted
                  ? "Désinscrire l'uitlisateur"
                  : "Valider l'inscription de l'utilistateur"
                }`}
            >
              <Image
                src={data.isAccepted ? theme.isDarkMode ? blockUserWhite : blockUserBlack : theme.isDarkMode ? checkUserWhite : checkUserBlack}
                alt="accepted"
                className="icon"
                onClick={() =>
                  toggleMethod && toggleMethod(data.id, data.isAccepted)
                }
              />
            </Tooltip>
            <Tooltip
              message={`${data.isAdmin
                  ? "Enlever rôle d'administrateur"
                  : "Promouvoir au rôle d'administrateur"
                }`}
            >
              <Image
                src={data.isAdmin ? theme.isDarkMode ? closeWhite : closeBlack : theme.isDarkMode ? adminWhite : adminBlack}
                alt="admin"
                className="icon"
                onClick={() =>
                  toggleMethod2 && toggleMethod2(data.id, data.isAdmin)
                }
              />
            </Tooltip>
            <Tooltip message="Supprimer l'utilisateur">
              <Image
                src={theme.isDarkMode ? trashWhite : trashBlack}
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
          src={theme.isDarkMode ? plusWhite : plusBlack}
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
            message={`Visibilité (Actuellement : ${data.published ? "Visible" : "Invisible"
              })`}
          >
            <Image
              src={data.published ? theme.isDarkMode ? eyeWhite : eyeBlack : theme.isDarkMode ? eyeCrossWhite : eyeCrossBlack}
              alt="view"
              className="icon"
              onClick={() =>
                toggleMethod && toggleMethod(data.id, data.published)
              }
            />
          </Tooltip>
          <Tooltip message="Modifier la question">
            <Image
              src={theme.isDarkMode ? editWhite : editBlack}
              alt="view"
              className="icon"
              onClick={() => setEdition(!edition)}
            />
          </Tooltip>
          <Tooltip message="Supprimer la question">
            <Image
              src={theme.isDarkMode ? trashWhite : trashBlack}
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
          message={`Visibilité (Actuellement : ${data.published ? "Visible" : "Invisible"
            })`}
        >
          <Image
            src={data.published ? theme.isDarkMode ? eyeWhite : eyeBlack : theme.isDarkMode ? eyeCrossWhite : eyeCrossBlack}
            alt="view"
            className="icon"
            onClick={() =>
              toggleMethod && toggleMethod(data.id, data.published)
            }
          />
        </Tooltip>
        <Tooltip message="Voir l'article">
          <Image
            src={theme.isDarkMode ? linkWhite : linkBlack}
            alt="link"
            className="icon"
            onClick={() => window.location.assign(`/article/${data.id}`)}
          />
        </Tooltip>
        <Tooltip message="Éditer l'article">
          <Image
            src={theme.isDarkMode ? editWhite : editBlack}
            alt="view"
            className="icon"
            onClick={() => window.location.assign(`/admin-edition/${data.id}`)}
          />
        </Tooltip>
        <Tooltip
          message="Supprimer"
          clicking={() => deleteMethod && deleteMethod(data.id)}
        >
          <Image src={theme.isDarkMode ? trashWhite : trashBlack} alt="trash" className="icon" />
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
        : renderCreateQuestionCard();
    case "question":
      return edition ? renderQuestionOpenCard() : renderQuestionCard();
    case "article":
      return renderArticleCard();
    default:
      return null;
  }
};

export default BasicCard;
