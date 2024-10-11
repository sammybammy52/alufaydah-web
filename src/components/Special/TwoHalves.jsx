import React from "react";
import HalfRow from "./HalfRow";

const TwoHalves = ({ one, two}) => {
  return (
    <div className="twohalves-section-container px-[50px] max-md:px-2">
      <div className="twohalves-card-box max-w-[1440px] mx-auto ">
        <div className="twohalves-bottom bg-white py-4 relative">
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
            <HalfRow name="Electronics" data={one} cat_id={"electronics-83550150"}/>
            <HalfRow name="Accessories" data={two} cat_id={"accessories-13188689"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoHalves;
