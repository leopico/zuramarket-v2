import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthCore } from "@particle-network/auth-core-modal";
import WalletConnectContext from "../../context/WalletContext";



const Wallte = () => {
    const { userInfo } = useAuthCore();
    // console.log(userInfo);
    const [isOpen, setIsOpen] = useState(false);

    const { login, logout, balance, executeUserOp, loader, handleMint, loading, addr} = useContext(WalletConnectContext);

    const handleModal = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex space-x-3 items-center relative">
            {
                userInfo && (
                    <div className="text-xs font-semibold text-gray-300">
                        {addr}
                    </div>
                )
            }
            {
                userInfo && (
                    <div className="flex flex-col items-center justify-center space-y-1">
                        <p className="text-gray-300 text-sm font-bold">{balance}</p>
                        <p onClick={handleMint} className="cursor-pointer rounded bg-blue-cus px-2 py-1 text-gray-300 text-xs font-bold">
                            {
                                loading ? "..." : "Mint Now"
                            }
                        </p>
                    </div>
                )
            }
            {
                userInfo ? (
                    <button
                        onClick={logout}
                        className="font-bold bg-blue-cus px-6 py-2 sm:px-12 sm:py-3 rounded-md hover:bg-blue-cus/95"
                    >
                        Log out
                    </button>
                ) : (
                    <button
                        onClick={handleModal}
                        className="font-bold bg-blue-cus px-12 py-3 rounded-md hover:bg-blue-cus/95"
                    >
                        {
                            loader ? "loading" : "Sign In"
                        }
                    </button>
                )
            }

            {userInfo && (
                <Link className={styles.link} href={`/`}>
                    <Image
                        className={styles.profileImage}
                        src="/user-icon.png"
                        width={42}
                        height={42}
                        alt="Profile"
                    />
                </Link>
            )}

            {
                isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-gray-700 p-4 rounded-md shadow-md w-full max-w-md">
                            <button className="font-semibold hover:text-gray-300" onClick={handleModal}>close</button>
                            <p className="text-center font-semibold">Zuraverse wallet</p>
                            <div className="flex flex-col justify-center items-center space-y-2 mt-4">
                                <button onClick={() => login("google")} className="px-4 py-2 w-full bg-blue-cus text-white rounded-md">
                                    Google
                                </button>
                                <button onClick={() => login("discord")} className="px-4 py-2 w-full bg-blue-cus text-white rounded-md">
                                    Discord
                                </button>
                                <button onClick={() => login("twitter")} className="px-4 py-2 w-full bg-blue-cus text-white rounded-md">
                                    Twitter
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        </>
    )
}

export default Wallte