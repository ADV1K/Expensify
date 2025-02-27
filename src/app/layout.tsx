import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});
const nunito = Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Expensify",
    description: "Expense Tracking Made Simple",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${nunito.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
