import React from "react";

const Loader = () => {
  return (
    <div className="relative">
      <div className="shadow-md animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      <p className="animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Waiting...
      </p>
    </div>
  );
};

export default Loader;
