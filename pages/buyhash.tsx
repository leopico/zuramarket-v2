import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/HashNFT/NFTGrid";
import Image from "next/image";
import hashMetadata, { HashMetadata } from "../util/hashMetadata";

export default function Buy() {

  const data: HashMetadata[] = hashMetadata;

  return (
    <>
      <div className="mt-2">
        <Image
          alt="banner"
          className="object-cover"
          src="/images/HASH.jpg"
          width={2000}
          height={1000}
        />
      </div>
      <Container maxWidth="lg">
        <NFTGrid
          data={data}
        />
      </Container>
    </>

  );
}