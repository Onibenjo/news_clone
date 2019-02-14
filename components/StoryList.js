import React from "react";
import Link from "next/link";

const StoryList = ({ stories }) => {
  return (
    <div className="story-list">
      {stories.map(story => (
        <div className="story" key={story.id}>
          <hr />
          <h2 className="story-title">
            <a href={story.url}>{story.title}</a>
          </h2>
          <div className="story-details">
            <span>{story.points || 0} points</span>
            <Link href={`/story?id=${story.id}`}>
              <a> {story.comments_count || 0} comments</a>
            </Link>
            <p>
              by {story.user} | {story.time_ago}
            </p>
          </div>
        </div>
      ))}

      <style jsx>{`
        .story-list {
          padding: 0 2rem;
        }
        .story {
          padding: 1rem 0;
          margin: 0;
        }
        .story-title {
          font-size: 1rem;
          font-weight: 400;
          margin: 0;
          margin-bottom: 0.4rem;
        }
        .story-title a {
          color: #333;
          text-decoration: none;
        }
        .story-title a:hover {
          text-decoration: underline;
        }
        .story-details {
          font-size: 0.8rem;
          font-weight: bold;
        }
        .story-details span {
          margin-right: 1rem;
          color: red;
        }
        .story-details a {
          color: #6600ff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default StoryList;
