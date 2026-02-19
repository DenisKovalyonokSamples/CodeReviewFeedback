import React, { useState } from "react";

// List of code review aspects to be displayed in the feedback system
const ASPECTS = [
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
  const [votes, setVotes] = useState(
    ASPECTS.map(() => ({ upvotes: 0, downvotes: 0, animateUp: false, animateDown: false }))
  );

  /**
   * Handles upvote button click for a given aspect.
   * Increments upvote count and triggers animation.
   * @param {number} idx - Index of the aspect to upvote.
   */
  const handleUpvote = (idx) => {
    setVotes((prev) =>
      prev.map((v, i) =>
        i === idx
          ? { ...v, upvotes: v.upvotes + 1, animateUp: true }
          : v
      )
    );
    // Remove animation after short delay
    setTimeout(() => {
      setVotes((prev) =>
        prev.map((v, i) =>
          i === idx ? { ...v, animateUp: false } : v
        )
      );
    }, 300);
  };

  /**
   * Handles downvote button click for a given aspect.
   * Increments downvote count and triggers animation.
   * @param {number} idx - Index of the aspect to downvote.
   */
  const handleDownvote = (idx) => {
    setVotes((prev) =>
      prev.map((v, i) =>
        i === idx
          ? { ...v, downvotes: v.downvotes + 1, animateDown: true }
          : v
      )
    );
    // Remove animation after short delay
    setTimeout(() => {
      setVotes((prev) =>
        prev.map((v, i) =>
          i === idx ? { ...v, animateDown: false } : v
        )
      );
    }, 300);
  };

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        {ASPECTS.map((aspect, idx) => (
          <div className="pa-10 w-300 card" key={aspect}>
            <h2>{aspect}</h2>
            <div className="flex my-30 mx-0 justify-content-around">
              {/* Upvote button for this aspect */}
              <button
                className="py-10 px-15"
                data-testid={`upvote-btn-${idx}`}
                onClick={() => handleUpvote(idx)}
              >
                👍 Upvote
              </button>
              {/* Downvote button for this aspect */}
              <button
                className="py-10 px-15 danger"
                data-testid={`downvote-btn-${idx}`}
                onClick={() => handleDownvote(idx)}
              >
                👎 Downvote
              </button>
            </div>
            {/* Upvote count with animation */}
            <p
              className={`my-10 mx-0${votes[idx].animateUp ? " vote-animate" : ""}`}
              data-testid={`upvote-count-${idx}`}
            >
              Upvotes: <strong>{votes[idx].upvotes}</strong>
            </p>
            {/* Downvote count with animation */}
            <p
              className={`my-10 mx-0${votes[idx].animateDown ? " vote-animate" : ""}`}
              data-testid={`downvote-count-${idx}`}
            >
              Downvotes: <strong>{votes[idx].downvotes}</strong>
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

