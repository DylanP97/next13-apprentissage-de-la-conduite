const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
});

export const newSignUpRequest = (email: string, firstName: string, lastName: string) => {
  return {
    from: `${email}`,
    to: `${process.env.GMAIL_USER}`,
    subject: `Nouvelle demande d'inscription de ${firstName} ${lastName}`,
    html: ` <div>
                <h3>Un utilisateur a fait une demande d'inscription :</h3>
                <div style="padding: 20px">
                  <p style="margin: 0px 0px 5px 0px">${firstName} ${lastName}</p>
                  <p style="margin: 0px 0px 5px 0px">${email}</p>
                  <p style="margin: 0px 0px 5px 0px">Vérifiez avec cet utilisateur son identité</p>
                </div>
              </div>`,
  };
};

export const signUpRequestReceived = (email: string, firstName: string) => {
  return {
    from: `${process.env.GMAIL_USER}`,
    to: `${email}`,
    subject: `Bonjour ${firstName}! Votre demande d'inscription a bien été reçue`,
    html: ` <div>
                <p>Votre demande d'inscription a bien été reçue.
                Nous reviendrons très rapidement vers vous pour valider votre inscription.</p>
              </div>`,
  };
};

export const resetPasswordLink = (email: string, token: any) => {
  return {
    from: `${process.env.GMAIL_USER}`,
    to: `${email}`,
    subject: "Réinitialisation de votre mot de passe.",
    text:
      "Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n" +
      "Veuillez cliquer sur le lien suivant ou le coller dans votre navigateur pour terminer le processus :\n\n" +
      `${process.env.BASE_URL}reset/${token}` +
      " " +
      "Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n",
  };
};

export const passwordSuccesfullyChanged = (email: string) => {
  return {
    from: `${process.env.GMAIL_USER}`,
    to: `${email}`,
    subject: "Votre mot de passe a été changé avec succès.",
    text:
      "Votre mot de passe a été modifié avec succès\n" +
      " " +
      "En cas d'erreur n'hésitez pas à nous contacter ou à recommencer la procédure de changement de mot de passe.\n",
  };
};

export const contactMail = (email: string, firstName: string, message: string) => {
  return {
    from: `${email}`,
    to: `${process.env.GMAIL_USER}`,
    subject: `${firstName} vous a contacté`,
    html: `<div style="background: #ececec;>
              <h3 style="padding: 20px; width: 100%">${firstName} vous a contacté depuis son interface. Voici son message:</h3>
              <br/>
              <p>${message}</p>
            </div>`,
  };
};

export const mailValidAccepted = (email: string, firstName: string) => {
  return {
    from: `${process.env.GMAIL_USER}`,
    to: `${email}`,
    subject: `Bonjour ${firstName}, votre inscription a été validé`,
    html: ` <div>
                <h3 style="padding: 20px; width: 100%">Votre demande d'inscription vient d'être valider</h3>
                <p>Vous pouvez désormais poursuivre votre inscription en sélectionnant votre abonnement sur cette page ${process.env.BASE_URL}abonnement </p>
              </div>`,
  };
};
