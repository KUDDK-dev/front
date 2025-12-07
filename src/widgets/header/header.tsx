import { User } from "#/types/user.type";
import Image from "next/image";

import "./header.scss";

import Input from "#/shared/input/input";
import UserIcon from "#/shared/user/userIcon";
import { Fragment } from "react/jsx-runtime";

interface Props {
    searchDisabled?: boolean,
    user?: User,
    children: React.ReactNode
}


export default function Header({ user, searchDisabled, children }: Props) {
  return (
    <Fragment>
        <header>
            <div className="first-section-container">
                <div className="logo">
                    <Image
                        src={"/chat_filled.svg"}
                        alt=""
                        priority={true}
                        width={20}
                        height={20}
                    />
                    <h1 className="logo-text">KUDDK</h1>
                </div>
                {!searchDisabled ? <Input className="search" placeholder="Search" /> : <></>}
            </div>
            <UserIcon user={user} />
        </header>
        <main>
            {children}
        </main>
    </Fragment>
  );
}
