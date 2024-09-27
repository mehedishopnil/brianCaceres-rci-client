import React from "react";

const AreaInfo = ({ place_name, location }) => {
  return (
    <div className="p-4 space-y-3 bg-[#e6f8fc]">
      <h1 className="text-4xl font-semibold">Area Information</h1>
      <h1 className="text-xl font-semibold">Getting There</h1>
      <div >
          <h1 className="font-semibold">{place_name}</h1>
          <h1>{location}</h1>
      </div>
    </div>
  );
};

export default AreaInfo;