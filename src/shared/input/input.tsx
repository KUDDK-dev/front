'use client'

import { InputHTMLAttributes } from "react";

import "./input.scss"
import Image from "next/image";


export default function Input({className, children, type, ...props}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`input-container ${className}`} {...props}>
        <Image
            src={"./search.svg"}
            alt=""
            width={14}
            height={14}
            className="image"
        />
        <input type="text" className="input" {...props} />
    </div>
  );
}
