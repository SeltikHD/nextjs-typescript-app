import type { ReactNode } from 'react';
import type { SchemaProps } from '@components/configs/Schema';
import type { MetatagsProps } from '@components/configs/Metatags';
import type { Session } from 'next-auth';
import type { Permissions } from '@prisma/client';
import type { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loading } from '@components/UI/Loading';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Metatags from '@components/configs/Metatags';
import Schema from '@components/configs/Schema';
import options from '@data/seo.json';

const StatusBar = dynamic(() => import('@components/UI/StatusBar'));
const Footer = dynamic(() => import('@components/UI/Footer'));
const Header = dynamic(() => import('@components/UI/Header'));

const Button = dynamic(() => import('@mui/material/Button'));
const Typography = dynamic(() => import('@mui/material/Typography'));

interface AuthProps {
    blockUnauthenticated?: boolean;
    allowAnonymous?: boolean;
    skeleton?: ReactNode;
    roleId?: string;
    roleName?: string;
    permissions?: Permissions[];
    unauthorized?: string;
}

export interface LayoutProps extends MetatagsProps, SchemaProps {
    children?: ReactNode;
    customDrawer?: ReactNode;
    customMetatags?: boolean;
    readStatusBar?: boolean;
    auth?: AuthProps;
    authComponent?: boolean;
    header?: boolean;
    footer?: boolean;
    overflowY?: boolean | string;
    overflowX?: boolean | string;
    session?: Session | null;
    visible?: boolean;
    setSession?: (session: Session | null, status: 'authenticated' | 'loading' | 'unauthenticated') => void;
}

const defaultSchemaProps: SchemaProps = {
    siteName: options.siteName,
    description: options.description,
    inLanguage: options.inLanguage,
    title: options.title,
    siteDescription: options.description,
};

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
};

export default function Layout({
    children,
    customDrawer,
    customMetatags = true,
    readStatusBar = false,
    setSession,
    header = true,
    footer = true,
    overflowY = true,
    overflowX = false,
    session,
    authComponent = true,
    visible = true,
    ...props
}: LayoutProps) {
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (setSession) setSession(session ?? data, status);
    }, [data, session, setSession, status]);

    const body = (
        <>
            {header && (
                <Header
                    customDrawer={customDrawer}
                    session={session ?? data}
                    loadingSession={status === 'loading'}
                    title={props.title ?? 'Next.Js'}
                />
            )}
            {readStatusBar && <StatusBar />}
            {header ? (
                <Box
                    sx={{
                        mt: '4.15em',
                        overflowY: overflowY ? (typeof overflowY === 'string' ? overflowY : 'auto') : 'hidden',
                        overflowX: overflowX ? (typeof overflowX === 'string' ? overflowX : 'auto') : 'hidden',
                    }}
                >
                    {children}
                </Box>
            ) : (
                <>{children}</>
            )}
            {footer && <Footer />}
        </>
    );

    return (
        <>
            <Schema {...defaultSchemaProps} {...props} />
            {customMetatags && <Metatags {...defaultMetatagsProps} {...props} />}
            {visible ? (
                authComponent ? (
                    <Auth router={router} {...props.auth} session={session ?? data} status={status}>
                        {body}
                    </Auth>
                ) : (
                    { body }
                )
            ) : (
                <>{children}</>
            )}
        </>
    );
}

function Auth({
    children,
    skeleton,
    roleId,
    roleName,
    permissions,
    unauthorized,
    blockUnauthenticated,
    allowAnonymous,
    router,
    session,
    status,
}: AuthProps & {
    children: ReactNode;
    router: NextRouter;
    session: Session | null;
    status: 'authenticated' | 'loading' | 'unauthenticated';
}) {
    const unauthorizedAction = () => {
        if (unauthorized) {
            router.replace(unauthorized);
        } else if (!router.asPath.includes('/login')) {
            router.replace({
                pathname: '/login',
                query: { redirect: router.asPath },
            });
        }
    };

    if (!blockUnauthenticated) return <>{children}</>;

    if (status != 'loading') {
        if (session == null) {
            unauthorizedAction();
            return null;
        }
        const isAuthorized = authFunction(session, status, roleId, roleName, permissions);

        if (isAuthorized == 'noRole' && !allowAnonymous)
            return (
                <>
                    <Typography variant="h5">You do not have permission to access this page.</Typography>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </>
            );
        else if (isAuthorized) return <>{children}</>;
        else {
            unauthorizedAction();
            return null;
        }
    }

    return skeleton ? <>{skeleton}</> : <Loading />;
}

export function authFunction(
    session: Session | null,
    status: string,
    roleId?: string,
    roleName?: string,
    permissions?: Permissions[],
) {
    if (session == null) return false;

    if (status === 'authenticated') {
        if (session.user.role == undefined || session.user.role == null) {
            return 'noRole';
        }

        if (roleId || roleName) {
            return roleId === session.user.role.id || roleName === session.user.role.name;
        } else if (permissions) {
            return permissions.every(permission => session.user.role?.permissions.includes(permission));
        }

        return true;
    } else return false;
}
