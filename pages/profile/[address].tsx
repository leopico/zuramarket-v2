import { useRouter } from "next/router";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Skeleton from "../../components/Skeleton/Skeleton";
import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

export default function ProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions">("nfts");
  
  return (
    <Container maxWidth="lg">
      <div className={styles.profileHeader}>
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />

        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />

        <h1 className={styles.profileName}>
          {router.query.address ? (
            <small>{router.query.address}</small>
          ) : (
            <Skeleton width="320" />
          )}
        </h1>

      </div>

      <div className={styles.tabs}>
        <h3
          className={`${styles.tab} 
          ${tab === "nfts" ? styles.activeTab : ""}`} //for dynamic routes
          onClick={() => setTab("nfts")}
        >
          NFTs
        </h3>

      </div>

      <div
        className={`${tab === "nfts" ? styles.activeTabContent : styles.tabContent
          }`}
      >
        <h1>listing nft</h1>
      </div>

      <div
        className={`${tab === "listings" ? styles.activeTabContent : styles.tabContent
          }`}
      >
        {false ? (
          <p>Loading...</p>
        ) : (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        )}

      </div>

      <div
        className={`${tab === "auctions" ? styles.activeTabContent : styles.tabContent
          }`}
      >
        {false ? (
          <p>Loading...</p>
        ) : (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        )}
      </div>

    </Container>
  );
}
