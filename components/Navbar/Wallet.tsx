import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthCore } from "@particle-network/auth-core-modal";
import WalletConnectContext from "../../context/WalletContext";
import useSigninModal from "../../hooks/useSigninModal";



const Wallet = () => {
    const { userInfo } = useAuthCore();
    // console.log(userInfo);
    const { isOpen, onOpen, onClose } = useSigninModal();

    const { login, logout, balance, loader, addr} = useContext(WalletConnectContext);

    const handleOpenModal: any = () => {
        onOpen();
    };

    const handleCloseModal: any = () => {
        onClose();
    }



    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex space-x-3 items-center relative">
            {
                userInfo && (
                    <div className="flex flex-col items-center justify-start bg-[#24252d] py-1 px-3 rounded-md border border-slate-800 shadow-lg">
                        <div className="text-sm font-semibold text-gray-300">
                            {addr}
                        </div>
                        <div className="text-gray-300 text-xs font-bold">{balance} <strong>MATIC</strong></div>
                    </div>
                )
            }
            {
                userInfo ? (
                    <button
                        onClick={logout}
                        className="font-bold bg-blue-cus px-3 py-1 sm:px-12 sm:py-3 rounded-md hover:bg-blue-cus/95"
                    >
                        Log out
                    </button>
                ) : (
                    <button
                        onClick={handleOpenModal}
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
                            <button className="font-semibold hover:text-gray-300" onClick={handleCloseModal}>close</button>
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

export default Wallet