import React, { useCallback } from "react";

import "./RatingsForm.css";

function RatingsForm({ operativeTaskRatings, setIsRatingOpen, isRatingOPen }) {
  const removeFormRatingsTag = (e) => {
    e.preventDefault();
    setIsRatingOpen(false);
  };

  return (
    <>
      {isRatingOPen && (
        <div className="wrapping_ratings_form">
          <form
            className="ratings_control_form"
            onSubmit={(e) => operativeTaskRatings(e)}
          >
            <ul className="rate_feed">
              <li>
                <label htmlFor="Ratings">Ratings</label>
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  className="ratings_size"
                  min="1"
                  max="5"
                  placeholder="3.0"
                />
              </li>
              <li>
                <label htmlFor="Feedback">FeedBack</label>
                <input
                  type="text"
                  name="feedback"
                  id="feedback"
                  className="feedback_size"
                  placeholder="Feedback..."
                />
              </li>
            </ul>
            <ul className="wrap_score_ratings">
              <li>
                <button
                  type="button"
                  className="abort_submit"
                  onClick={(e) => removeFormRatingsTag(e)}
                >
                  Clear
                </button>
              </li>
              <li>
                <button type="submit" className="send_new_feed">
                  Send
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </>
  );
}

export default RatingsForm;
