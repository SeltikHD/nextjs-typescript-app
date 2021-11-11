import Link from 'next/link';
import CustomHead from '../components/CustomHead';
import Layout from '../components/Layout';

const AboutPage = () => (
    <Layout>
        <CustomHead title="About | Next.js + TypeScript Example" />
        <h1>About</h1>
        <p>This is the about page</p>
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
);

export default AboutPage;
