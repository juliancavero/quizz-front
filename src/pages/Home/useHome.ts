import { useState } from "react";

const useHome = () => {
  const [count, setCount] = useState(0);
  return {
    count,
    setCount,
  };
};

export default useHome;
