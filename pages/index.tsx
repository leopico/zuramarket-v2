import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import TabSection from "../components/Tab/TabSection";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <section className="container mx-auto hidden sm:block">
          <div className="relative">
            {/* Layer 0 */}
            <div className="absolute lg:-bottom-24 xl:-bottom-36 -left-28 w-full h-full hidden lg:block">
              <Image
                alt="layer_0"
                src="/images/hero_bg_2.png"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>

            {/* Banner */}
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <Image
                alt="banner"
                src="/images/Clip.png"
                width={3000}
                height={1000}
                className="object-cover"
              />
            </div>

            <div className="absolute top-2 right-0 sm:top-4 sm:right-6 lg:top-8 lg:right-14 xl:top-16 xl:right-32 z-20">
              <div className="sm:text-xl sm:font-semibold md:text-2xl
             md:font-bold lg:text-4xl lg:font-extrabold text-left tracking-tight hidden sm:block">
                <h2>
                  Discover the vast universe
                  <br />of &nbsp;
                  <span
                    className="
                  text-transparent bg-clip-text bg-gradient-to-r
                  from-green-cus from-50%  to-yellow-400 to-80%"
                  >
                    Hippie Aliens Cosmic Klub
                  </span>
                </h2>
              </div>
              <div className=" pt-3 text-left text-md tracking-tight hidden lg:block">
                <p>
                  H.A.C.K is the gateway to Zuraverse. H.A.C.K NFTs introduce
                  Zuraverse to the Web3 audience.
                </p>
                <p>
                  They are the stepping stone in the formation of Zuraverse.
                </p>
              </div>
              <div className=" pt-8 lg:pt-10 xl:pt-16 text-left flex">
                <Link href="https://zuraverse.xyz/" target="_blink">
                  <button className="px-8 py-2 text-md me-5
               lg:me-14 rounded bg-blue-cus text-white tracking-wider hidden sm:block">
                    Know More
                  </button>
                </Link>
              </div>
            </div>

            {/* Layer 0 */}
            <div className="absolute xl:top-72 xl:right-16 lg:top-52 lg:right-2 hidden lg:block">
              <Image
                alt="layer_0"
                src="/images/hero_bg_1.png"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>

            {/* cutty baby */}
            <div className={`absolute xl:top-72 xl:right-32 z-30 hidden lg:block lg:top-52 lg:right-16 ${styles['cutty-baby']}`}>
              <Image
                alt="layer_0"
                src="/images/layer18.png"
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>
      <section className="mx-auto sm:hidden flex justify-center items-center mb-8">
        <Image
          alt="layer_0"
          src="/images/mob-banner1.png"
          width={400}
          height={400}
          className="object-cover w-full"
        />
      </section>
      <TabSection />
    </>
  );
};

export default Home;