import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { useEthereum, useAuthCore } from "@particle-network/auth-core-modal";
import { PolygonMumbai } from "@particle-network/chains";
import { AAWrapProvider, SmartAccount, SendTransactionMode } from "@particle-network/aa";
import { ethers } from "ethers";

import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import { abi } from "../const/blockchain/houseABI.json";
import { HOUSE_CONTRACT_ADDRESS } from "../const/contractAddresses";
import WalletConnectContext from "./WalletContext";
import simpleAbi from "../const/blockchain/simpleABI.json"

const nftAddress = "0xb97a934761b902D3C1D59e241514dF75a715eBCd";


interface MessageContextValue {
    handleMint: (tid: number) => void
    handleWLMint: (tid: number) => void
    handleSimpleMint: () => void
    mintLoader: boolean
    mintWLLoader: boolean
    simpleMintLoader: boolean
}

const UserContext = createContext<MessageContextValue>({
    handleMint: () => { },
    handleWLMint: () => { },
    handleSimpleMint: () => { },
    mintLoader: false,
    mintWLLoader: false,
    simpleMintLoader: false
});


export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { provider } = useEthereum();
    const { userInfo } = useAuthCore();

    const { address } = useContext(WalletConnectContext);

    const [mintLoader, setMintLoader] = useState(false);
    const [mintWLLoader, setMintWLLoader] = useState(false);
    const [simpleMintLoader, setSimpleMintLoader] = useState(false);

    const smartAccount = new SmartAccount(provider, {
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECTID as string,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENTKEY as string,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APPID as string,
        aaOptions: {
            accountContracts: {
                SIMPLE: [
                    {
                        version: '1.0.0',
                        chainIds: [PolygonMumbai.id]
                    }
                ]
            }
        }
    });

    const gaslessProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless) || null, "any");


    const handleMint = async (tid: number) => {
        if (userInfo) {
            try {
                setMintLoader(true)
                const signer = gaslessProvider.getSigner();
                const contract = new ethers.Contract(HOUSE_CONTRACT_ADDRESS, abi, signer);
                console.log(contract);
                const tx = await contract.mint(tid, { gasLimit: 500000 });
                const txreceipt = await tx.wait();
                console.log(txreceipt);
                toast(`TxHash!: ${txreceipt.transactionHash}`, {
                    icon: "✅",
                    style: toastStyle,
                    position: "bottom-center",
                });
                setMintLoader(false);
            } catch (error: any) {
                setMintLoader(false);
                console.log(error);
                toast(`Error!: ${error.message}`, {
                    icon: "❌",
                    style: toastStyle,
                    position: "bottom-center",
                });
            }
        } else {
            toast(`Error!: you don't have wallet address`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        }
    };

    const handleWLMint = async (tid: number) => {
        if (userInfo) {
            try {
                setMintWLLoader(true)
                const signer = gaslessProvider.getSigner();
                const contract = new ethers.Contract(HOUSE_CONTRACT_ADDRESS, abi, signer);
                console.log(contract);
                const tx = await contract.whitelistMint(tid, { gasLimit: 500000 });
                const txreceipt = await tx.wait();
                console.log(txreceipt);
                toast(`TxHash!: ${txreceipt.transactionHash}`, {
                    icon: "✅",
                    style: toastStyle,
                    position: "bottom-center",
                });
                setMintWLLoader(false);
            } catch (error: any) {
                setMintWLLoader(false);
                console.log(error);
                toast(`Error!: ${error.message}`, {
                    icon: "❌",
                    style: toastStyle,
                    position: "bottom-center",
                });
            }
        } else {
            toast(`Error!: you don't have wallet address`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        }
    };

    const handleSimpleMint = async () => {
        try {
            setSimpleMintLoader(true);
            const signer = gaslessProvider.getSigner();
            const contract = new ethers.Contract(nftAddress, simpleAbi, signer);
            console.log(contract);
            const tx = await contract.safeMint(address);
            const txreceipt = await tx.wait();
            // console.log(txreceipt);
            toast(`TxHash!: ${txreceipt.transactionHash}`, {
                icon: "✅",
                style: toastStyle,
                position: "bottom-center",
            });
            setSimpleMintLoader(false)
        } catch (error) {
            setSimpleMintLoader(false);
            console.log(error);
            toast(`Error!: ${error}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        }
    }


    return (
        <UserContext.Provider
            value={{ handleMint, mintLoader, handleWLMint, mintWLLoader, handleSimpleMint, simpleMintLoader }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Define the propTypes for MessageContextProvider
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default UserContext;
