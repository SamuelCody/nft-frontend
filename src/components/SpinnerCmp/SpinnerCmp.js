import React from "react";
import { SpinnerCircular } from "spinners-react";

const SpinnerCmp = ({ enabled, size, thickness, color, secondaryColor }) => {
  return (
    <>
      <SpinnerCircular
        enabled={enabled}
        size={size || 50}
        thickness={thickness || 100}
        color={color}
        secondaryColor={secondaryColor}
      />
    </>
  );
};

export default SpinnerCmp;
