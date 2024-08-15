import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ESinco",
  description: "Projeto de Software UFCG",
};

export default function RootLayout({ children }) {
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
