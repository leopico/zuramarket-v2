import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import { NFT_ZURAHOUSE_ADDRESS } from "../const/contractAddresses";
import Image from "next/image";
import HOUSENFTGrid from "../components/ZURAHOUSENFT/ZuraHouseNFTGrid";
import { NFT as NFTType } from '@thirdweb-dev/sdk';

const generateHref = (nft: NFTType, index: number) => {
    const links = [
        process.env.NEXT_PUBLIC_TOKEN_0,
        process.env.NEXT_PUBLIC_TOKEN_1,
        process.env.NEXT_PUBLIC_TOKEN_2,
        process.env.NEXT_PUBLIC_TOKEN_3,
        process.env.NEXT_PUBLIC_TOKEN_4
    ];

    // Use index to select a link for each NFT
    return links[index] || "https://zuraverse.xyz"; // Fallback link if index is out of range
};

export default function Buy() {
    // Load all of the NFTs from the NFT Collection
    const { contract } = useContract(NFT_ZURAHOUSE_ADDRESS);
    const { data, isLoading } = useNFTs(contract);

    const dataWithHref = data?.map((nft, index) => ({
        ...nft,
        metadata: {
            ...nft.metadata,
            href: generateHref(nft, index)
        }
    }));


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
                <HOUSENFTGrid
                    data={dataWithHref}
                    isLoading={isLoading}
                    emptyText={
                        "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
                    }
                />
            </Container>
        </>

    );
}
