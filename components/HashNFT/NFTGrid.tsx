import Link from "next/link";
import React from "react";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";
import { HashMetadata } from "../../util/hashMetadata";

type Props = {
  data: HashMetadata[];
  overrideOnclickBehavior?: (nft: HashMetadata) => void;
};

export default function NFTGrid({ data, overrideOnclickBehavior }: Props) {
  return (
    <div className={styles.nftGridContainer}>
      {
        data.map((hashnft) =>
        !overrideOnclickBehavior ? (
          <Link
            href={`/hashtoken/${hashnft.TID}`}
            key={hashnft.TID}
            className={styles.nftContainer}
          >
            <NFT nft={hashnft} />
          </Link>
        ) : (
          <div
            key={hashnft.TID}
            className={styles.nftContainer}
            onClick={() => overrideOnclickBehavior(hashnft)}
          >
            <NFT nft={hashnft} />
          </div>
        ))
      }
    </div>
  );
}
