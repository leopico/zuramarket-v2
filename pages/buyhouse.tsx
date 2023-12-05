import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import Image from "next/image";
import houseMetadata, { HouseMetadata } from "../util/houseMetadata";

export default function Buy() {

  const data: HouseMetadata[] = houseMetadata;

  return (
    <>
      <div className="mt-2">
        <Image
          alt="banner"
          className="object-cover"
          src="/images/Zura_HQ.jpg"
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
