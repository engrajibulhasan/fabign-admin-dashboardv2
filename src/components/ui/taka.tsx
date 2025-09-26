import React from "react";

type TakaProps = {
  size?: string | number; // font size can be "20px" or 20
  className?: string;     // extra styling if needed
};

const Taka: React.FC<TakaProps> = ({ size = "16px", className }) => {
  return (
    <span style={{ fontSize: size }} className={className}>
      ৳
    </span>
  );
};

export default Taka;
