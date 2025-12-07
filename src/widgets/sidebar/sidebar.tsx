"use client"

import { routes } from "#/config/routes";
import Image from "next/image";

import "./sidebar.scss";
import { redirect, usePathname } from "next/navigation";

interface Props {
    children: React.ReactNode
}


export default function Sidebar({ children }: Props) {
    const pathname = usePathname();

    const onClick = (route: string) => redirect(route);
    const pathnameStyle = (route: string) => route == pathname ? "route-active" : "";

    return (
        <div className="main-container">
            <section className="sidebar">
                {routes.map((route, i) => 
                    <div className={`image-container ${pathnameStyle(route.route)}`} key={i}>
                        <Image
                            src={route.icon}
                            alt={route.name}
                            width={30}
                            height={30}
                            onClick={onClick.bind(null, route.route)}
                        />
                    </div>
                )}
            </section>
            {children}
        </div>
    );
}
