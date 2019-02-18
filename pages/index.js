import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import Link from "next/link";

class Index extends Component {
  static async getInitialProps({ req, res, query }) {
    let stories, page;
    try {
      page = Number(query.page) || 1;
      const res = await fetch(`https://api.hackerwebapp.com/news?page=${page}`);
      // const res = await fetch(
      //   `https://api.hackerwebapp.com/news?page=${page}`
      // );
      stories = await res.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return { page, stories };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });

      navigator.serviceWorker.ready.then(function(registration) {
        console.log("Service Worker Ready");
      });
    }
  }

  render() {
    const { stories, page } = this.props;
    let footer;
    if (stories.length == 0) {
      return <Error statusCode={503} />;
    }
    switch (page) {
      case 1:
        footer = "";
        break;

      default:
        footer = (
          <React.Fragment>
            <Link href={`/?page=${page - 1}`}>
              <a>Prev Page ({page - 1})</a>
            </Link>
            <style>{`
          footer a {
            text-decoration: none;
            background: indigo;
            border: 2px solid indigo;
            padding: 0.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.2s ease-in;
            display: inline-block;
            color: #fff;
          }
          footer a:hover {
            transform: scale(0.85);
          }
            `}</style>
          </React.Fragment>
        );
        break;
    }
    return (
      <Layout
        title="Hack News Update"
        description="A news site with updates on tech news | A hacker news clone site | Made with React and NextJs"
      >
        <StoryList stories={stories} />
        <footer>
          {footer}

          {/* <Link href={`/?page=${page - 1}`}>
            <a>Prev Page ({page - 1})</a>
          </Link> */}
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            background: #f60;
            background-image: linear-gradient(
              to right,
              #ed6ea0 0%,
              #ec8c69 100%
            );
            padding: 1rem;
            text-align: center;
          }
          footer > * {
            display: inline-block;
            color: #000;
          }
          footer a {
            text-decoration: none;
            background: indigo;
            border: 2px solid indigo;
            padding: 0.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.2s ease-in;
            color: #fff;
          }
          footer a:hover {
            transform: scale(0.85);
          }
        `}</style>
      </Layout>
    );
  }
}
export default Index;
