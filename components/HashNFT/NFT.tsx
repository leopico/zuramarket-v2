import React from "react";
import styles from "./NFT.module.css";
import Image from "next/image";
import { HashMetadata } from "../../util/hashMetadata";

type Props = {
  nft: HashMetadata;
};

export default function NFTComponent({ nft }: Props) {

  return (
    <>
      <video
        src={nft.IPFS}
        controls
        className={styles.nftImage}
        width={400}
        height={300}
      />
      <p className={styles.nftTokenId}>Token ID #{nft.TID}</p>
      <p className={styles.nftName}>{nft.Name}</p>
      <div className={styles.priceContainer}>
        <div className={styles.nftPriceContainer}>
          <div>
            <p className={styles.nftPriceLabel}>Price</p>
            <p className={styles.nftPriceValue}>Not for sale</p>
          </div>
        </div>
      </div>
    </>
  );
}
