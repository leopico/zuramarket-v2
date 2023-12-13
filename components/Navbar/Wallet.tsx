import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import WalletConnectContext from "../../context/WalletContext";
import { adminAddresses } from "../../const/constant";

const Wallet = () => {

    const { 
        login, logout, loader, logoutLoader, addr, web3authAddress, web3authBalance, web3authAddr, 
        balance, signer, loadingInit, address } = useContext(WalletConnectContext);
    
        

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex space-x-3 items-center relative">
                {
                    signer && (
                        <div className="flex flex-col items-center justify-start bg-[#24252d] py-1 px-3 rounded-md border border-slate-800 shadow-lg">
                            <div className="text-sm font-semibold text-gray-300">
                                {
                                loader ? (<small>loding...</small>) : 
                                <small>
                                    {
                                        adminAddresses.includes(web3authAddress) ? (<>{web3authAddr}</>) : (<>{addr}</>)
                                    }
                                </small>
                                }
                            </div>
                            <div className="text-gray-300 text-xs font-bold">
                                {
                                loader ? (<small>loding...</small>) : 
                                <small>
                                    {
                                        adminAddresses.includes(web3authAddress) ? (
                                            <>{web3authBalance ? (web3authBalance.slice(0,6)) : 0}</>
                                        ) : (
                                            <>{balance ? (balance.slice(0,6)) : 0}</>
                                        )
                                    } 
                                </small>
                                }
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
                        adminAddresses.includes(web3authAddress) ? (
                            <Link className={styles.link} href={`/admin/${web3authAddress}`}>
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