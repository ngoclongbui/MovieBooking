import React from "react";
import { Link } from "react-router-dom";
import { PAGES } from "../../util/settings/config";

export default function NoMatch() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2>Nothing to see here!</h2>
        <p>
          <Link to={PAGES.INDEX}>Go to home page</Link>
        </p>
      </div>
    </div>
  );
}
