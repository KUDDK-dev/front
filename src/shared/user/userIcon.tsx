'use client'

import { User } from "#/types/user.type";
import { Fragment } from "react/jsx-runtime";

import "./userIcon.scss"

import Image from "next/image";


interface Props {
  user?: User
}

export default function UserIcon({ user }: Props) {
  return user
  ? (
    <Fragment></Fragment>
  )
  : (
    <div className="icon-container">
      <Image
        src={"./user_empty.svg"}
        alt=""
        width={30}
        height={30}
      />
    </div>
  );
}
