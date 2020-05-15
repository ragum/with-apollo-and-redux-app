import Head from "next/head";
import Navigation from "./navigation";

const Layout = ({children, pageConfig}) => {
    const { title } = pageConfig;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
                <Navigation/>
            </header>
            <div className="content">
                {children}
            </div>
        </>
    );
}

export default Layout;
