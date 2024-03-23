import React from "react";

function HomeFetchingError({ error }) {
  return (
    <>
      <div className="error_wrapp">
        <p className="error">{error} </p>{" "}
      </div>
    </>
  );
}

export default HomeFetchingError;
