import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"PT Garda Karya Nusantara"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
