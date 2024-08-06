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
    <html lang="pt-BR" className = 'dark'>
      <body className = {inter.className}>
          <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
