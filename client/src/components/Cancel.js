import React from "react";

const Cancel = () => {
  setTimeout(function redirectBack() {
    window.location.href = "http://localhost:3000";
  }, 5000);

  return (
    <div>
      <center>
        <h1>Cancel</h1>
        <h2>Your Payment has been failed</h2>
      </center>
    </div>
  );
};

export default Cancel;
