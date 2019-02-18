import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import Layout from "../components/Layout";
import CommentList from "../components/CommentList";

class Story extends Component {
  static async getInitialProps({ req, res, query }) {
    let story;
    try {
      const storyId = query.id;
      const res = await fetch(`https://api.hackerwebapp.com/item/${storyId}`);
      story = await res.json();
    } catch (error) {
      story = null;
    }

    return { story };
  }
  render() {
    const { story } = this.props;

    if (!story) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout title={story.title} description={story.title} backButton={true}>
        <main>
          <h1 className="story-title">
            <a href={story.url}>{story.title}</a>
          </h1>
          <div className="story-details">
            <strong>{story.points} points |</strong>
            <strong>{story.comments_count} comments |</strong>
            <strong>{story.time_ago}</strong>
          </div>

          {story.comments.length > 0 ? (
            <CommentList comments={story.comments} />
          ) : (
            <div>No comments for this story</div>
          )}
        </main>

        <style jsx>{`
          main {
            padding: 1rem;
          }
          .story-title {
            font-size: 1.2rem;
            margin: 0;
            font-weight: 300;
            padding-bottom: 0.5rem;
          }
          .story-title a {
            text-decoration: none;
            color: #333;
          }
          .story-title a:hover {
            text-decoration: underline;
          }
          .story-details {
            font-size: 0.8rem;
            padding-bootom: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
          }
          .story-details strong {
            margin-right: 1rem;
          }
          .story-details a {
            color: #f60;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Story;
