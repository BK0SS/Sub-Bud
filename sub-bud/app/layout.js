import "./globals.css";
import './fanta.css'
import Head from "./Head"
import Link from "next/link";
import GoTo from "@/components/GoTo";
import AuthProvider from "@/context/AuthContext";


export const metadata = {
  title: "Subscription Bud - Subscription Tracker",
  description: "Track your subscriptions.",
};

export default function RootLayout({ children }) {
  const header = (<header>
    <div>
      <Link href={'/'}>
        <h1 className="text-gradient">Subscription Bud</h1>
        <p>Track your subscriptions</p>
      </Link>
    </div>
    <GoTo/>
  </header>)

  const footer =(<footer>
    <div className="hard-line"/>
    <div className="footer-content">
      <div>
        <div>
          <h4>Sub Bud</h4>
          <p>|</p>
          <button disabled>Install app</button>
        </div>
        <p className="copyright">All rights reserved.</p>
      </div>
      <div>
        <p>Facing Issues? <a>Help</a></p>
        <p>Feedback? <a href="https://www.linkedin.com/in/bogdan-kosulin/" target="_blank">Share it</a></p>
        <div>
          <Link href={'/privacy'}><button data-bwignore>Privacy Policy</button></Link>
          <Link href={'/tos'}><button data-bwignore>Terms of Service</button></Link>
        </div>
      </div>
    </div>
  </footer>)

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
      <body >
        {header}
        <div className="full-line"/>
        <main>
          {children}
        </main>
        {footer}
      </body>
      </AuthProvider>
    </html>
  );
}
