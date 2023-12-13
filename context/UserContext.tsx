import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";


import houseABI from "../const/blockchain/houseABI.json";
import { HOUSE_CONTRACT_ADDRESS } from "../const/constant";
import mintABI from "../const/blockchain/simpleMint.json";
import { ethers } from "ethers";
import { encodeFunctionData, parseAbi } from 'viem';
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs"

import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import WalletConnectContext from "./WalletContext";

const nftAddress = "0x795EF5Da7FfA14CBc42DB628F0a0d44FD36545Dd";


interface MessageContextValue {
    handleMint: (tid: number) => void
    handleWLMint: (tid: number) => void
    handleSimpleMint: () => void
    mintLoader: boolean
    mintWLLoader: boolean
    simpleMintLoader: boolean
    handleHashMint: (tid: number) => void
    hashloader: boolean
    handleHashWLMint: (tid: number) => void
    hashWLLoader: boolean
}

const UserContext = createContext<MessageContextValue>({
    handleMint: () => { },
    handleWLMint: () => { },
    handleSimpleMint: () => { },
    mintLoader: false,
    mintWLLoader: false,
    simpleMintLoader: false,
    handleHashMint: () => {},
    hashloader: false,
    handleHashWLMint: () => {},
    hashWLLoader: false
});


export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const { signer, address, provider } = useContext(WalletConnectContext);

    const [mintLoader, setMintLoader] = useState(false);
    const [mintWLLoader, setMintWLLoader] = useState(false);

    const [hashloader, setHashLoader] = useState(false);
    const [hashWLLoader, setHashWLLoader] = useState(false);

    const [simpleMintLoader, setSimpleMintLoader] = useState(false);

    const addresses = [
        "0xaaC3A7B643915d17eAcc3DcFf8e1439fB4B1a3D2",
        "0x72F8f5bDc6E8a92dF64e4B22fe7A8050f007386a"
    ]


    const handleMint = async (tid: number) => {
        try {
            if (!provider || !signer) {
                console.log("Provider or signer not available");
                toast(`logged out in successfully!`, {
                    icon: "✅",
                    style: toastStyle,
                    position: "bottom-center",
                });
                return;
            }
            setMintLoader(true);
            const contractABI = parseAbi([
                'function mint(uint256 _id) external nonReentrant isAddress(msg.sender)'
            ]);

            const { hash }: any = await signer?.sendUserOperation({
                target: nftAddress, // need to update
                data: encodeFunctionData({
                    abi: contractABI, //need to update
                    functionName: "mint",
                    args: [tid]
                })
            });
            const response = await signer?.waitForUserOperationTransaction(hash);
            console.log("mintResponse", response);
            toast(`TxHash!: ${response}`, {
                icon: "✅",
                style: toastStyle,
                position: "bottom-center",
            });
            setMintLoader(false);
        } catch (error) {
            setMintLoader(false);
            console.error(error)
            toast(`Error!: ${error}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        }
    };

    const handleWLMint = async (tid: number) => {
        try {
            if (!provider || !signer) {
                console.log("Provider or signer not available");
                toast(`logged out in successfully!`, {
                    icon: "✅",
                    style: toastStyle,
                    position: "bottom-center",
                });
                return;
            }
            setMintWLLoader(true);

            const leafNode = addresses.map((x) => keccak256(x));
            const tree = new MerkleTree(leafNode, keccak256, {
                sortPairs: true,
            });
            const buf2hex = (x: any) => "0x" + x.toString("hex");
            // console.log(buf2hex(tree.getRoot())); //for getting hash root
            const leaf = keccak256(address); //hashing for user account
            const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));

            const contractABI = parseAbi([
                'function whitelistMint(uint256 _id, bytes32[] memory proof) external nonReentrant isAddress(msg.sender)'
            ]);

            const { hash }: any = await signer?.sendUserOperation({
                target: nftAddress, //need to update
                data: encodeFunctionData({
                    abi: contractABI, //need to update
                    functionName: "whitelistMint",
                    args: [tid, proof]
                })
            });
            const response = await signer?.waitForUserOperationTransaction(hash);
            console.log("mintResponse", response);
            toast(`TxHash!: ${response}`, {
                icon: "✅",
                style: toastStyle,
                position: "bottom-center",
            });
            setMintWLLoader(false);
        } catch (error) {
            setMintWLLoader(false);
            console.error(error)
            toast(`Error!: ${error}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        }
    };

    const handleHashMint = async (tid: number) => {
        alert("handleHashMint");
    };

    const handleHashWLMint = async (tid: number) => {
        alert("handleHashWLMint");
    };

    const handleSimpleMint = async () => {
        try {
            if (!provider || !signer) {
                console.log("Provider or signer not available");
                toast(`logged out in successfully!`, {
                    icon: "✅",
                    style: toastStyle,
                    position: "bottom-center",
                });
                return;
            }
            setSimpleMintLoader(true);
            const contractABI = parseAbi([
                'function safeMint(address to) public'
            ]);

            const { hash }: any = await signer?.sendUserOperation({
                target: nftAddress,
                data: encodeFunctionData({
                    abi: contractABI,
                    functionName: "safeMint",
                    args: [address as `0x${string}`]
                })
            });
            const response = await signer?.waitForUserOperationTransaction(hash);
            console.log("mintResponse", response);
            toast(`TxHash!: ${response}`, {
                icon: "✅",
                style: toastStyle,
                position: "bottom-center",
            });
            setSimpleMintLoader(false);
        } catch (error) {
            setSimpleMintLoader(false);
            console.error(error)
            toast(`Error!: ${error}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
        }
    };

    return (
        <UserContext.Provider
            value={{
                handleMint,
                handleWLMint,
                handleSimpleMint,
                mintLoader,
                mintWLLoader,
                simpleMintLoader,
                handleHashMint,
                hashloader,
                handleHashWLMint,
                hashWLLoader
            }}
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
