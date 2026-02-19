import React, { useState } from "react";

// List of code review aspects to be displayed in the feedback system
const codeQualityAspects = [
  "Readability",
  "Performance",
  "Security",
  "Documentation",
  "Testing"
];

/**
 * CodeReviewFeedback component displays voting UI for code quality aspects.
 * Each aspect has upvote/downvote buttons and animated counters.
 * Uses React state to track votes and provides a subtle animation on count change.
 */

const CodeReviewFeedback = () => {
  // State: Array of { upvotes, downvotes, animateUp, animateDown } for each aspect
  const [aspectVotes, setAspectVotes] = useState(
    codeQualityAspects.map(() => ({ upvotes: 0, downvotes: 0, animateUp: false, animateDown: false }))
  );

  /**
   * Handles upvote button click for a given aspect.
   * Increments upvote count and triggers animation.
   * @param {number} idx - Index of the aspect to upvote.
   */
  const handleUpvote = (aspectIndex) => {
    setAspectVotes((previousVotes) =>
      previousVotes.map((aspectVote, index) =>
        index === aspectIndex
          ? { ...aspectVote, upvotes: aspectVote.upvotes + 1, animateUp: true }
          : aspectVote
      )
    );
    // Remove animation after short delay
    setTimeout(() => {
      setAspectVotes((previousVotes) =>
        previousVotes.map((aspectVote, index) =>
          index === aspectIndex ? { ...aspectVote, animateUp: false } : aspectVote
        )
      );
    }, 300);
  };

  /**
   * Handles downvote button click for a given aspect.
   * Increments downvote count and triggers animation.
   * @param {number} idx - Index of the aspect to downvote.
   */
  const handleDownvote = (aspectIndex) => {
    setAspectVotes((previousVotes) =>
      previousVotes.map((aspectVote, index) =>
        index === aspectIndex
          ? { ...aspectVote, downvotes: aspectVote.downvotes + 1, animateDown: true }
          : aspectVote
      )
    );
    // Remove animation after short delay
    setTimeout(() => {
      setAspectVotes((previousVotes) =>
        previousVotes.map((aspectVote, index) =>
          index === aspectIndex ? { ...aspectVote, animateDown: false } : aspectVote
        )
      );
    }, 300);
  };

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        {codeQualityAspects.map((aspectName, aspectIndex) => (
          <div className="pa-10 w-300 card" key={aspectName}>
            <h2>{aspectName}</h2>
            <div className="flex my-30 mx-0 justify-content-around">
              {/* Upvote button for this aspect */}
              <button
                className="py-10 px-15"
                data-testid={`upvote-btn-${aspectIndex}`}
                onClick={() => handleUpvote(aspectIndex)}
              >
                👍 Upvote
              </button>
              {/* Downvote button for this aspect */}
              <button
                className="py-10 px-15 danger"
                data-testid={`downvote-btn-${aspectIndex}`}
                onClick={() => handleDownvote(aspectIndex)}
              >
                👎 Downvote
              </button>
            </div>
            {/* Upvote count with animation */}
            <p
              className={`my-10 mx-0${aspectVotes[aspectIndex].animateUp ? " vote-animate" : ""}`}
              data-testid={`upvote-count-${aspectIndex}`}
            >
              Upvotes: <strong>{aspectVotes[aspectIndex].upvotes}</strong>
            </p>
            {/* Downvote count with animation */}
            <p
              className={`my-10 mx-0${aspectVotes[aspectIndex].animateDown ? " vote-animate" : ""}`}
              data-testid={`downvote-count-${aspectIndex}`}
            >
              Downvotes: <strong>{aspectVotes[aspectIndex].downvotes}</strong>
            </p>
          </div>
        ))}
      </div>
      {/* Inline style for subtle animation on vote count change */}
      <style>{`
        .vote-animate {
          transition: color 0.2s, transform 0.2s;
          color: #1976d2;
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
};

export default CodeReviewFeedback;

