import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "./ZuraHouseNFT";
import styles from "../../styles/Buy.module.css";

type Props = {
    isLoading: boolean;
    data: NFTType[] | undefined;
    overrideOnclickBehavior?: (nft: NFTType) => void;
    emptyText?: string;
};

export default function HOUSENFTGrid({
    isLoading,
    data,
    overrideOnclickBehavior,
    emptyText = "No NFTs found for this collection.",
}: Props) {
    return (
        <div className={styles.nftGridContainer}>
            {isLoading ? (
                [...Array(5)].map((_, index) => (
                    <div key={index} className={styles.nftContainer}>
                        <Skeleton key={index} width={"100%"} height="312px" />
                    </div>
                ))
            ) : data && data.length > 0 ? (
                data.map((nft) =>
                    !overrideOnclickBehavior ? (
                        <Link
                            href={nft.metadata.href as string}
                            key={nft.metadata.id}
                            className={styles.nftContainer}
                            target="_blink"
                        >
                            <NFT nft={nft} />
                        </Link>
                    ) : (
                        <div
                            key={nft.metadata.id}
                            className={styles.nftContainer}
                            onClick={() => overrideOnclickBehavior(nft)}
                        >
                            <NFT nft={nft} />
                        </div>
                    )
                )
            ) : (
                <p>{emptyText}</p>
            )}
        </div>
    );
}
