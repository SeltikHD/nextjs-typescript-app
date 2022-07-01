import Head from 'next/head';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type MetatagsProps = {
    title?: string;
    keywords?: string;
    description?: string;
    type?: string;
    appName?: string;
    imageSource?: string;
    imageAltText?: string;
    twitterCard?: string;
    canonical?: string;
    author?: string;
    publishDate?: string;
    robots?: string;
    url?: string;
    ogImage?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    language?: string;
    orgName?: string;
    children?: ReactNode;
    themeColor?: string;
    iconsPath?: string;
};

export default function CustomHead(props: MetatagsProps) {
    const [currentUrl, setCurrentUrl] = useState('');
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (window.location.href !== currentUrl) {
            setCurrentUrl(window.location.href);
        }

        if (window.location.origin !== origin) {
            setOrigin(window.location.origin);
        }
    }, [currentUrl, origin]);

    return (
        <Head>
            <link rel="canonical" href={props.canonical} />
            <meta charSet="UTF-8" />
            <meta httpEquiv="Content-Language" content={props.language ?? 'pt-BR'} />
            <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
            <meta httpEquiv="Content-Type" content="text/html" />
            <title Props-react-helmet="true">
                {props.title?.includes('inherit:')
                    ? `${props.appName} - ${props.title.replaceAll('inherit:', '')}`
                    : props.title}
            </title>
            <meta Props-react-helmet="true" name="description" content={props.description} />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
            <meta name="copyright" content={props.orgName} />
            <meta name="keywords" content={props.keywords} />
            {props.robots && <meta name="robots" content={props.robots} />}
            <meta name="author" content={props.orgName} />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="manifest" href="/manifest.json" />
            {props.description && <meta name="description" content={props.description} />}
            {props.author && <meta name="author" content={props.author} />}
            {props.publishDate && <meta name="publish_date" property="og:publish_date" content={props.publishDate} />}

            <meta name="application-name" content={props.title} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={props.title} />
            <meta name="description" content={props.description} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/icons/browserconfig.xml" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content={props.appName} />
            <meta name="theme-color" content={props.themeColor} />
            <meta name="msapplication-TileColor" content={props.themeColor} />
            <meta name="msapplication-starturl" content={props.url} />

            {props.iconsPath && (
                <>
                    <meta name="msapplication-TileImage" content={`${props.iconsPath}favicon.ico`} />
                    <link rel="shortcut icon" href={`${props.iconsPath}favicon.ico`} type="image/x-icon" />
                    <link rel="apple-touch-icon" href={`${props.iconsPath}apple-touch-icon/apple-touch-icon.png`} />
                    <link
                        rel="apple-touch-icon"
                        sizes="57x57"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-57x57.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-72x72.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-76x76.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-114x114.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-120x120.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-144x144.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-152x152.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href={`${props.iconsPath}apple-touch-icon/apple-touch-icon-180x180.png`}
                    />
                </>
            )}

            <meta property="og:title" content={props.title} />
            {props.appName && <meta property="og:site-name" content={props.appName} />}
            {props.description && <meta property="og:description" content={props.description} />}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={props.language ?? 'pt-BR'} />
            {props.url && <meta property="og:url" content={props.url} />}

            {props.imageSource && <meta property="og:image" content={props.imageSource} />}
            {props.type && <meta property="og:image:type" content={props.type} />}
            {props.ogImageWidth && <meta property="og:image:width" content={`${props.ogImageWidth}`} />}
            {props.ogImageHeight && <meta property="og:image:height" content={`${props.ogImageHeight}`} />}
            {props.twitterCard && <meta name="twitter:card" content="summary_large_image" />}
            {props.imageSource && <meta name="twitter:image" content={props.imageSource} />}
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            {props.imageSource && props.imageAltText && <meta name="twitter:image:alt" content={props.imageAltText} />}

            {props.children}
        </Head>
    );
}
