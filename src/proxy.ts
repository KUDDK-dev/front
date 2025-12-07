import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server'
import type { NextRequest, ProxyConfig } from 'next/server'
import { User, UserSchema } from './types/user.type';
import { Skills } from './types/skills.enum';

export const config: ProxyConfig = {
    matcher: "/((?!auth).*)"
}

export function proxy(request: NextRequest) {
    request.cookies.set("username", "oleg");
    request.cookies.set("tags", "tag1,tag2,tag3");
    request.cookies.set("skills", "DevOps,Docker");
    request.cookies.set("guid", "086ff626-9bbc-4bd5-b277-68855ee84a13");
    request.cookies.set("status", "My cool status");

    const user = getUserAttempt(request.cookies);

    if (!user)
        return NextResponse.redirect(new URL("/auth", request.url));
}

function getUserAttempt(cookies: RequestCookies): User | undefined {
    const user = UserSchema.safeParse({
        username: cookies.get("username")?.value,
        tags: cookies.get("tags")?.value.split(","),
        skills: cookies.get("skills")?.value.split(",").filter(skill => Object.keys(Skills).includes(skill)),
        guid: cookies.get("guid")?.value,
        status: cookies.get("status")?.value
    });

    return user.data;
}