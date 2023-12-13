import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import styles from "../../styles/Token.module.css";
import randomColor from "../../util/randomColor";
import { Toaster } from "react-hot-toast";
import UserContext from "../../context/UserContext";
import { useRouter } from "next/router";
import WalletConnectContext from "../../context/WalletContext";
import hashMetadata, { HashMetadata } from "../../util/hashMetadata";


const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default function TokenPage() {
  const router = useRouter();
  const tid = router.query.tokenId as string;
  const tidNum = parseInt(tid);

  const [currentHash, setCurrentHash] = useState<HashMetadata | null>(null);
  // console.log(currentHouse);

  const { handleHashMint, hashloader, handleHashDisMint, hashWLLoader } = useContext(UserContext);
  const { login, address, loader } = useContext(WalletConnectContext);

  useEffect(() => {
    const matchingHash = hashMetadata.find((hash) => hash.TID.toString() === tid);
    setCurrentHash(matchingHash || null)
  }, [tid]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
        {
          currentHash ? (
            <div className={styles.container}>
              <div className={styles.metadataContainer}>
                <video
                  src={currentHash.IPFS}
                  controls
                  className={styles.image}
                  width={400}
                  height={300}
                />
                <div className={styles.descriptionContainer}>
                  <h3 className={styles.descriptionTitle}>Description</h3>
                  <p className={styles.description}>
                    {currentHash.Description}
                  </p>

                  <h3 className={styles.descriptionTitle}>Traits</h3>
                  <div className={styles.traitsContainer}>
                    <div className={styles.traitContainer}>
                      {
                        currentHash.Attributes.map((attr) => (
                          <div className="" key={attr.trait_type}>
                            <p className={styles.traitName}>{attr.trait_type}</p>
                            <p className={styles.traitValue}>{attr.value}</p>
                          </div>
                        ))
                      }

                    </div>
                  </div>
                </div>
              </div>

              {/* left */}
              <div className={styles.listingContainer}>
                <h1 className={styles.title}>{currentHash.Name}</h1>
                <p className={styles.collectionName}>Token ID #{currentHash.TID}</p>

                <div
                  className={styles.nftOwnerContainer}
                >
                  {/* Random linear gradient circle shape */}
                  <div
                    className={styles.nftOwnerImage}
                    style={{
                      background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                    }}
                  />
                  <div className={styles.nftOwnerInfo}>
                    <p className={styles.label}>Current Owner</p>
                    <p className={styles.nftOwnerAddress}>
                      0x000000...0000
                    </p>
                  </div>
                </div>

                {/*start modification for mint logic */}
                <div className={styles.pricingContainer}>
                  <div className={styles.pricingInfo}>
                    <div>
                      <p><span className={styles.label}>Phase name</span>: coming soon</p>
                      <p><span className={styles.label}>Supply</span>: coming soon</p>
                      <p><span className={styles.label}>Maximum claimable per wallet</span>: coming soon</p>
                      <p><span className={styles.label}>Current Minted</span>: coming soon</p>
                      <p><span className={styles.label}>Price</span>: coming soon</p>
                    </div>
                    {
                      address ? (
                        <>
                          <div className="pt-3">
                            <button
                              onClick={() => handleHashMint(tidNum)}
                              className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                            >
                              {
                                hashloader ? "loading" : "Public Mint"
                              }
                            </button>
                          </div>
                          <div className="pt-3">
                            <button
                              onClick={() => handleHashDisMint(tidNum)}
                              className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                            >
                              {
                                hashWLLoader ? "loading" : "Whitelisted Mint"
                              }
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="pt-3">
                          <button
                            onClick={login}
                            className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                          >
                            {loader ? "loading..." : "Sign In"}
                          </button>
                        </div>
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="flex items-center justify-center max-h-screen">loading...</p>
          )
        }
      </Container>
    </>
  );
};