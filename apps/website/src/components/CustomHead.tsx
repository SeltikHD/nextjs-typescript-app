import Head from 'next/head';
import type { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
    title?: string;
    appName?: string;
    keywords?: string;
    robots?: string;
    description?: string;
    url?: string;
    ogImage?: string;
    ogImageType?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
};

export const orgName = 'Default Ltda.'; //Name of your organization
const defaultTitle = 'NextJS TypeScript Template'; //Default page title
const defaultAppName = 'NextJS TypeScript Template'; //Default app name
const defaultKeywords = ''; //Main keywords
let finalKeywords: string = defaultKeywords;
const defaultDescription = 'This template uses Next JS, MUI v5, Prisma, TypeScript and some other very useful dependencies.'; //Default description
const defaultRobots = 'all'; //Default robots configs
const themeColor = '#9b9b9b'; //Your app theme color
const defaultURL = 'localhost:3000'; //Default URL of your site
const iconsPath = '/img/icons/'; //Your icons path (I recommend the iconifier.net website)
const defaultOgImage = '/img/favicon.png'; //Your og image
const defaultOgImageType = 'image/png'; //Type of your og image
const defaultOgImageWidth = 800; //Width of your og image
const defaultOgImageHeight = 800; //Height of your og image

export default function customHead({
    children,
    title = defaultTitle,
    appName = defaultAppName,
    description = defaultDescription,
    keywords,
    robots = defaultRobots,
    url = defaultURL,
    ogImage = defaultOgImage,
    ogImageType = defaultOgImageType,
    ogImageWidth = defaultOgImageWidth,
    ogImageHeight = defaultOgImageHeight,
}: Props) {
    if (keywords) {
        finalKeywords = `${defaultKeywords}, ${keywords}`;
    }
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="Content-Language" content="pt-br" />
            <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
            <meta httpEquiv="Content-Type" content="text/html" />
            <title data-react-helmet="true">{title}</title>
            <meta data-react-helmet="true" name="description" content={description} />
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
            <meta name="copyright" content={orgName} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="robots" content={robots} />
            <meta name="author" content={orgName} />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="description" content={description} />

            <meta name='application-name' content={title} />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-status-bar-style' content='default' />
            <meta name='apple-mobile-web-app-title' content={title} />
            <meta name='description' content={description} />
            <meta name='format-detection' content='telephone=no' />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='msapplication-config' content='/icons/browserconfig.xml' />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content={appName} />
            <meta name="theme-color" content={themeColor} />
            <meta name="msapplication-TileColor" content={themeColor} />
            <meta name="msapplication-starturl" content={url} />

            <meta name="msapplication-TileImage" content={`${iconsPath}favicon.ico`} />
            <link rel="shortcut icon" href={`${iconsPath}favicon.ico`} type="image/x-icon" />
            <link rel="apple-touch-icon" href={`${iconsPath}apple-touch-icon/apple-touch-icon.png`} />
            <link
                rel="apple-touch-icon"
                sizes="57x57"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-57x57.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="72x72"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-72x72.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="76x76"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-76x76.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="114x114"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-114x114.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="120x120"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-120x120.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="144x144"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-144x144.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="152x152"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-152x152.png`}
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={`${iconsPath}apple-touch-icon/apple-touch-icon-180x180.png`}
            />

            <meta property="og:title" content={title} />
            <meta property="og:site-name" content={appName} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:url" content={url} />

            <meta property="og:image" content={ogImage} />
            <meta property="og:image:type" content={ogImageType} />
            <meta property="og:image:width" content={`${ogImageWidth}`} />
            <meta property="og:image:height" content={`${ogImageHeight}`} />
            <meta name="twitter:card" content="summary_large_image" />

            {children}
        </Head>
    );
}