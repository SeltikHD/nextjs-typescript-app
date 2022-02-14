import Header from './UI/MainHeader';
import Footer from './UI/MainFooter';
import CustomHead from './CustomHead';
import StatusBar from './UI/StatusBar';
import { ReactNode } from 'react';

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
