import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import Image from "next/image";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

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
          isLoading={isLoading}
          emptyText={
            "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
          }
        />
      </Container>
    </>

  );
}
