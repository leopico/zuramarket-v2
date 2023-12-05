import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import styles from "../../styles/Token.module.css";
import randomColor from "../../util/randomColor";
import { Toaster } from "react-hot-toast";
import UserContext from "../../context/UserContext";
import Image from "next/image";
import { useRouter } from "next/router";
import houseMetadata, { HouseMetadata } from "../../util/houseMetadata";
import WalletConnectContext from "../../context/WalletContext";
import { useAuthCore } from "@particle-network/auth-core-modal";
import useSigninModal from "../../hooks/useSigninModal";


const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default function TokenPage() {
  const { userInfo } = useAuthCore();
  const router = useRouter();
  const tid = router.query.tokenId as string;
  const tidNum = parseInt(tid);

  const { onOpen } = useSigninModal();

  const [currentHouse, setCurrentHouse] = useState<HouseMetadata | null>(null);
  // console.log(currentHouse);

  const { handleMint, mintLoader, handleWLMint, mintWLLoader, handleSimpleMint, simpleMintLoader } = useContext(UserContext);

  useEffect(() => {
    const matchingHouse = houseMetadata.find((house) => house.TID.toString() === tid);
    setCurrentHouse(matchingHouse || null)
  }, [tid]);

  const handleOpenModal: any = () => {
    onOpen();
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
        {
          currentHouse ? (
            <div className={styles.container}>
              <div className={styles.metadataContainer}>
                <Image
                  src={currentHouse.IPFS}
                  alt="house-nft"
                  className={styles.image}
                  width={100}
                  height={200}
                  layout="responsive"
                />
                <div className={styles.descriptionContainer}>
                  <h3 className={styles.descriptionTitle}>Description</h3>
                  <p className={styles.description}>
                    {currentHouse.Description}
                  </p>

                  <h3 className={styles.descriptionTitle}>Traits</h3>
                  <div className={styles.traitsContainer}>
                    <div className={styles.traitContainer}>
                      <p className={styles.traitName}>{currentHouse.Attributes.trait_type}</p>
                      <p className={styles.traitValue}>{currentHouse.Attributes.value}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* left */}
              <div className={styles.listingContainer}>
                <h1 className={styles.title}>{currentHouse.Name}</h1>
                <p className={styles.collectionName}>Token ID #{currentHouse.TID}</p>

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
                      userInfo ? (
                        <>
                          <div className="pt-3">
                            <button
                              onClick={() => handleMint(tidNum)}
                              className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                            >
                              {
                                mintLoader ? "loading" : "Public Mint"
                              }
                            </button>
                          </div>
                          <div className="pt-3">
                            <button
                              onClick={() => handleWLMint(tidNum)}
                              className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                            >
                              {
                                mintWLLoader ? "loading" : "Whitelisted Mint"
                              }
                            </button>
                          </div>
                          <div className="pt-3">
                            <button
                              onClick={() => handleSimpleMint()}
                              className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                            >
                              {
                                simpleMintLoader ? "loading" : "Simple Mint"
                              }
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="pt-3">
                          <button
                            onClick={handleOpenModal}
                            className="bg-slate-300 rounded-lg text-center text-slate-700 w-full px-2 py-3"
                          >
                            Sign In
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