import React from "react";
import Link from "next/link";

const StoryList = ({ stories }) => {
  let num = 0;
  return (
    <div className="story-list">
      {stories.map(story => (
        <div className="story" key={story.id}>
          <h2 className="story-title">
            {(num += 1)}
            {". "}
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
        .story {
          padding: 0.8rem 1.2rem;
          margin: 0;
          border-bottom: 1px solid #d1cace;
        }
        .story-title {
          font-size: 1rem;
          font-weight: 400;
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
          color: #333;
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
