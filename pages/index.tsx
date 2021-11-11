import Link from 'next/link';
import CustomHead from '../components/CustomHead';
import Layout from '../components/Layout';

const IndexPage = () => (
    <Layout>
        <CustomHead title="Home | Next.js + TypeScript Example"/>
        <h1>Hello Next.js 👋</h1>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </Layout>
);

export default IndexPage;
