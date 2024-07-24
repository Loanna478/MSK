// components/QuantumLoader.tsx
import { useEffect } from "react";

const QuantumLoader = () => {
  useEffect(() => {
    import('ldrs').then((ldrs) => {
      const { infinity  } = ldrs;
      infinity .register();
    });
  }, []);

  return <l-infinity size="80" stroke="4" stroke-length="0.15" bg-opacity="0.1" speed="1.3"  color="white" ></l-infinity>;

};

export default QuantumLoader;
