import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { I18nProvider } from "./providers/I18nProvider";

export const metadata: Metadata = {
  title: "Botelho Beach House",
  description: "Casa de locação por temporada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <I18nProvider>
          <QueryProvider>
            <Navigation />
            {children}
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
