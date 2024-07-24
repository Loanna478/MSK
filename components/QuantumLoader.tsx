// components/QuantumLoader.tsx
import { useEffect } from "react";

const QuantumLoader = () => {
  useEffect(() => {
    import('ldrs').then((ldrs) => {
      const { waveform } = ldrs;
      waveform.register();
    });
  }, []);

  return <l-waveform size="45" speed="1.75" color="white"></l-waveform>;
};

export default QuantumLoader;
