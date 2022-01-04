import Header from './MainHeader';
import Footer from './MainFooter';
import CustomHead from './CustomHead';
import StatusBar from './StatusBar';

interface LayoutProps {
    children: React.ReactNode;
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
