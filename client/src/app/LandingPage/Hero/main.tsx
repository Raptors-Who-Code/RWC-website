import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <div>
      <Image
        src="/assets/images/logo.png"
        alt="Raptors Who Code Logo"
        width={400}
        height={400}
      />
    </div>
  );
}

export default Hero;
