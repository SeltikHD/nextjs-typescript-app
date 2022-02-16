import CustomHead from './CustomHead';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const StatusBar = dynamic(() => import('./UI/StatusBar'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });
const Footer = dynamic(() => import('./UI/MainFooter'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });
const Header = dynamic(() => import('./UI/MainHeader'), {/* loading: () => <CircularProgress disableShrink />,*/ ssr: false });

type LayoutProps = {
    children: ReactNode;
    customHead?: boolean;
    readStatusBar?: boolean;
}

export default function Layout({ children, customHead = true, readStatusBar = false }: LayoutProps) {
    return (
        <>
            {customHead ? <CustomHead /> : null}
            {readStatusBar ? <StatusBar /> : null}
            <Header />
            {children}
            <Footer />
        </>
    );
}
