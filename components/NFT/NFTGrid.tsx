import Link from "next/link";
import React from "react";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";
import { HouseMetadata } from "../../util/houseMetadata";

type Props = {
  data: HouseMetadata[];
  overrideOnclickBehavior?: (nft: HouseMetadata) => void;
};

export default function NFTGrid({ data, overrideOnclickBehavior }: Props) {
  return (
    <div className={styles.nftGridContainer}>
      {
        data.map((housenft) =>
        !overrideOnclickBehavior ? (
          <Link
            href={`/housetoken/${housenft.TID}`}
            key={housenft.TID}
            className={styles.nftContainer}
          >
            <NFT nft={housenft} />
          </Link>
        ) : (
          <div
            key={housenft.TID}
            className={styles.nftContainer}
            onClick={() => overrideOnclickBehavior(housenft)}
          >
            <NFT nft={housenft} />
          </div>
        ))
      }
    </div>
  );
}
