"use client"

import Image from "next/image";
import "./page.scss";
import { redirect } from "next/navigation";

export default function Auth() {

  const login = () => {
    console.log("click");
    redirect(process.env.NEXT_PUBLIC_BACKEND_AUTH_REDIRECT!);
  }

  return (
    <div className="auth-container">
        <button onClick={login} className="microsoft-auth-redirect-button">
          <Image
            priority={true}
            src={"/microsoft.svg"}
            alt=""
            width={35}
            height={35}/>
          <span className="button-text-medium">Войти с помощью Microsoft</span>
        </button>
    </div>
  );
}
