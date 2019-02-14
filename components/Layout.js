import Link from "next/link";
import Head from "next/head";
import Router from "next/router";

const Layout = ({ children, title, description, backButton }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container">
        <nav>
          {backButton && (
            <span onClick={() => Router.back()} className="back-button">
              &#x2b05;
            </span>
          )}
          <Link href="/">
            <a>
              <span className="main-title">
                <center>
                  <h1>{title}</h1>
                </center>
              </span>
            </a>
          </Link>
        </nav>

        {children}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: #f6f6ef;

          box-shadow: 0 8px 10px rgba(0, 0, 0, 0.4);
        }
        nav {
          background: #f60;
          background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
          background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);

          padding: 1rem;
        }
        nav > * {
          display: inline-block;
          color: #000;
        }
        nav a {
          text-decoration: none;
        }
        nav .main-title {
          font-weight: bold;
        }
        nav .back-button {
          font-size: 0.9rem;
          padding-right: 1rem;
          cursor: pointer;
        }
      `}</style>
      <style global jsx>{`
        body {
          background: #fff;
          font-family: Verdana, Geneva, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Layout;
