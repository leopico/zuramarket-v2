import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import WalletConnectContext from "../../context/WalletContext";

const Wallet = () => {

    const { login, logout, loader, logoutLoader, addr, balance, signer, loadingInit, address } = useContext(WalletConnectContext);
    
    const adminAddress = "0xaaC3A7B643915d17eAcc3DcFf8e1439fB4B1a3D2";

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex space-x-3 items-center relative">
                {
                    signer && (
                        <div className="flex flex-col items-center justify-start bg-[#24252d] py-1 px-3 rounded-md border border-slate-800 shadow-lg">
                            <div className="text-sm font-semibold text-gray-300">
                                {loader ? (<small>loding...</small>) : <small>{addr}</small>}
                            </div>
                            <div className="text-gray-300 text-xs font-bold">
                                {loader ? (<small>loding...</small>) : <small>{balance ? (balance.slice(0,6)) : 0}</small>}
                                <strong><small className=" tracking-tighter">MATIC</small></strong>
                            </div>
                        </div>
                    )
                }

                {loadingInit ? (
                    <span className='text-xs font-bold text-opacity-5'>loading...</span>
                ) : signer ? (
                    <button
                        disabled={loadingInit}
                        onClick={logout}
                        className="font-bold bg-blue-cus px-3 py-2 sm:px-12 sm:py-3 rounded sm:rounded-md hover:bg-blue-cus/95"
                    >
                        {logoutLoader ? "loading..." : "Log out"}
                    </button>
                ) : (
                    <button
                        disabled={loadingInit}
                        onClick={login}
                        className="font-bold bg-blue-cus px-12 py-3 rounded-md hover:bg-blue-cus/95"
                    >
                        { loader ? "loading..." : "Sign In" }
                    </button>
                )}

                {
                    signer ? (
                        address === adminAddress ? (
                            <Link className={styles.link} href={`/admin/${address}`}>
                                <Image
                                    className={styles.profileImage}
                                    src="/user-icon.png"
                                    width={42}
                                    height={42}
                                    alt="Profile"
                                />
                            </Link>
                        ) : (
                            <Link className={styles.link} href={`/profile/${address}`}>
                                <Image
                                    className={styles.profileImage}
                                    src="/user-icon.png"
                                    width={42}
                                    height={42}
                                    alt="Profile"
                                />
                            </Link>
                        )
                    ) : (
                        null
                    )
                }
            </div>
        </>
    )
}

export default Wallet