import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/provider";
import { useContext, useEffect } from "react/cjs/react.production.min";
import SessionContext from "@/contexts/sessionContext";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProjetIn",
  description: "Projeto de Software UFCG",
};

export default function RootLayout({ children }) {
    const session = useContext(SessionContext);

    useEffect(() => {
        if(session.isLoading) return;
        if(session.isError || !session.data) redirect("/login");
    }, [session.isLoading])
    
  return (
    <html lang="pt-BR" data-theme='dark'>
      <body className={`${inter.className} h-screen`}>
          <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}