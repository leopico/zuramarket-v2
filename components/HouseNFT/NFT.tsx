import React from "react";
import styles from "./NFT.module.css";
import Image from "next/image";
import { HouseMetadata } from "../../util/houseMetadata";

type Props = {
  nft: HouseMetadata;
};

export default function NFTComponent({ nft }: Props) {

  return (
    <>
      <Image
        className={styles.nftImage}
        alt="house-nft"
        src={nft.IPFS}
        width={100}
        height={200}
        layout="responsive"
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
