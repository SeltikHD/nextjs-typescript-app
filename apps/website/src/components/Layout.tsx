import type { ReactNode } from 'react';
import type { SchemaProps } from '@components/configs/Schema';
import type { MetatagsProps } from '@components/configs/Metatags';
import type { Session } from 'next-auth';
import type { Role } from '@prisma/client';
import type { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loading } from '@components/UI/Loading';
import dynamic from 'next/dynamic';
import Metatags from '@components/configs/Metatags';
import Schema from '@components/configs/Schema';
import options from "@data/seo.json";
const StatusBar = dynamic(() => import('@components/UI/StatusBar'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });
const Box = dynamic(() => import('@mui/material/Box'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });
const Footer = dynamic(() => import('@components/UI/MainFooter'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });
const Header = dynamic(() => import('@components/UI/MainHeader'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });

interface AuthProps {
    blockUnauthorized?: boolean;
    skeleton?: ReactNode;
    role?: Role;
    unauthorized?: string;
    setSession?: (session: Session | null, status: "authenticated" | "loading" | "unauthenticated") => void;
}

interface LayoutProps extends MetatagsProps, SchemaProps {
    children: ReactNode;
    customDrawer?: ReactNode;
    customMetatags?: boolean;
    readStatusBar?: boolean;
    auth?: AuthProps;
}

const defaultSchemaProps: SchemaProps = {
    siteName: options.siteName,
    description: options.description,
    inLanguage: options.inLanguage,
    title: options.title,
    siteDescription: options.description,
}

const defaultMetatagsProps: MetatagsProps = {
    title: options.title,
    keywords: options.keywords,
    description: options.description,
    type: options.type,
    appName: options.siteName,
    imageSource: options.imageSource,
    imageAltText: options.imageAltText,
    twitterCard: options.twitterCard,
    author: options.author,
    robots: options.robots,
    url: options.baseUrl,
    ogImage: options.imageSource,
    language: options.inLanguage,
    orgName: options.organization,
    themeColor: options.themeColor,
    iconsPath: options.iconsPath,
}

export default function Layout({ children, customDrawer, customMetatags = true, readStatusBar = false, auth, ...props }: LayoutProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    const customSetSession = (s: Session | null, status: "authenticated" | "loading" | "unauthenticated") => { setSession(s); setSessionLoading(status === "loading"); if (auth?.setSession) auth.setSession(s, status) };

    return (
        <>
            <Schema {...defaultSchemaProps} {...props} />
            {customMetatags ? <Metatags {...defaultMetatagsProps} {...props} /> : null}
            <Auth router={useRouter()} {...auth} setSession={customSetSession}>
                <Header customDrawer={customDrawer} session={session} loadingSession={sessionLoading} />
                {readStatusBar ? <StatusBar /> : null}
                <Box sx={{ marginTop: '64px' }} >
                    {children}
                </Box>
                <Footer />
            </Auth>
        </>
    );
}

function Auth({ children, skeleton, role, unauthorized, setSession, blockUnauthorized, router }: AuthProps & { children: ReactNode, router: NextRouter }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (setSession) setSession(session, status);
    }, [session, setSession, status]);

    const unauthorizedAction = () => {
        if (unauthorized) {
            router.push(unauthorized);
        } else {
            signIn();
            return null;
        }
    }

    if (!blockUnauthorized) return <>{children}</>;

    if (status === "authenticated") {
        if (role) {
            if (role === session?.user?.role) return <>{children}</>; else unauthorizedAction();
        }

        return <>{children}</>;
    } else if (status === "unauthenticated") unauthorizedAction();

    return skeleton ? <>{skeleton}</> : <Loading />;
}
