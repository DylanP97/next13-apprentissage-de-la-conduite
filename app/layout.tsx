import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "@/app/providers/ToasterProvider";
import ThemeProvider from '@/app/providers/ThemeProvider';

export const metadata: Metadata = {
  title: "Apprentissage de la Conduite et de la Sécurité Routière",
  description: "Blog d'apprentissage à l'examen de conduite Alexandre Boitel",
  icons: {
    icon: "./favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr-FR">
      <ThemeProvider>
        <body suppressHydrationWarning={true}>
          <ClientOnly>
            <ToasterProvider />
          </ClientOnly>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
