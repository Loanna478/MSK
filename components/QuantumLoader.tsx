// components/QuantumLoader.tsx
import { useEffect } from "react";

const QuantumLoader = () => {
  useEffect(() => {
    import('ldrs').then((ldrs) => {
      const { quantum } = ldrs;
      quantum.register();
    });
  }, []);

  return <l-quantum size="45" speed="1.75" color="white"></l-quantum>;
};

export default QuantumLoader;
