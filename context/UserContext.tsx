import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { HOUSE_CONTRACT_ADDRESS, HASH_CONTRACT_ADDRESS } from "../const/constant";
import { whitelistedAddress } from "../const/constant";

import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs"

import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import WalletConnectContext from "./WalletContext";
import { BigNumber, ethers } from "ethers";


interface MessageContextValue {
    handleMint: (tid: number) => void
    handleWLMint: (tid: number) => void
    mintLoader: boolean
    mintWLLoader: boolean
    handleHashMint: (tid: number) => void
    hashloader: boolean
    handleHashDisMint: (tid: number) => void
    hashWLLoader: boolean
}

const UserContext = createContext<MessageContextValue>({
    handleMint: () => { },
    handleWLMint: () => { },
    mintLoader: false,
    mintWLLoader: false,
    handleHashMint: () => { },
    hashloader: false,
    handleHashDisMint: () => { },
    hashWLLoader: false
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const { signer, address, provider } = useContext(WalletConnectContext);

    const [mintLoader, setMintLoader] = useState(false);
    const [mintWLLoader, setMintWLLoader] = useState(false);

    const [hashloader, setHashLoader] = useState(false);
    const [hashWLLoader, setHashWLLoader] = useState(false);


    const handleMint = async (tid: number) => {
        if (!signer) {
            console.log("Provider or signer not available");
            toast(`Please refresh and login again!`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
            return;
        }
        const abiArray = [
            'function mint(uint256 _id) external',
        ];
        try {
            setMintLoader(true);
            const parsedAbi = new ethers.utils.Interface(abiArray);
            console.log('Parsed ABI:', parsedAbi);

            const encodedData = parsedAbi.encodeFunctionData('mint', [BigNumber.from(tid)]);
            console.log("data", encodedData);

            const { hash }: any = await signer?.sendUserOperation({
                target: HOUSE_CONTRACT_ADDRESS,
                data: encodedData as `0x${string}`
            });
            console.log("hash", hash);
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
        if (!signer) {
            console.log("Please refresh and login again!");
            toast(`logged out in successfully!`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
            return;
        };
        const abiArray = [
            'function whitelistMint(uint256 _id, bytes32[] memory proof) external'
        ]
        try {
            setMintWLLoader(true);
            const leafNode = whitelistedAddress.map((x) => keccak256(x));
            console.log("leadNode", leafNode);
            const tree = new MerkleTree(leafNode, keccak256, {
                sortPairs: true,
            });
            const buf2hex = (x: any) => "0x" + x.toString("hex");
            console.log("hashroot", buf2hex(tree.getRoot())); //for getting hash root
            const leaf = keccak256(address); //hashing for user account
            console.log("leaf", leaf);
            const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
            console.log("proof", proof);

            const parsedAbi = new ethers.utils.Interface(abiArray);
            console.log('Parsed ABI:', parsedAbi);

            const encodedData = parsedAbi.encodeFunctionData('whitelistMint', [BigNumber.from(tid), proof]);
            console.log("data", encodedData);

            const { hash }: any = await signer?.sendUserOperation({
                target: HOUSE_CONTRACT_ADDRESS,
                data: encodedData as `0x${string}`
            });
            console.log("hash", hash);
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
        if (!signer) {
            console.log("Provider or signer not available");
            toast(`Please refresh and login again!`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
            return;
        };
        alert("handleHashMint");
        // try {
        //     setHashLoader(true);
        //     const contractABI = parseAbi([
        //         'function claim(uint256 _id) external payable'
        //     ]);
        //     const { hash }: any = await signer?.sendUserOperation({
        //         target: HASH_CONTRACT_ADDRESS, //need to update
        //         data: encodeFunctionData({
        //             abi: contractABI, //need to update
        //             functionName: "claim",
        //             args: [BigInt(tid)],
        //         }),
        //         value: ethers.utils.parseEther("0.2").toBigInt()
        //     });
        //     const response = await signer?.waitForUserOperationTransaction(hash);
        //     console.log("mintResponse", response);
        //     toast(`TxHash! please check successful or not: ${response}`, {
        //         icon: "✅",
        //         style: toastStyle,
        //         position: "bottom-center",
        //     });
        //     setHashLoader(false);
        // } catch (error) {
        //     setHashLoader(false);
        //     console.error(error)
        //     toast(`Error!: ${error}`, {
        //         icon: "❌",
        //         style: toastStyle,
        //         position: "bottom-center",
        //     });
        // }
    };

    const handleHashDisMint = async (tid: number) => {
        if (!signer) {
            console.log("Provider or signer not available");
            toast(`Please refresh and login again!`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
            return;
        };
        alert('handleHashDisMint')
        // try {
        //     setHashWLLoader(true);
        //     const contractABI = parseAbi([
        //         'function claimWithDiscount(uint256 _id) external payable'
        //     ]);
        //     const { hash }: any = await signer?.sendUserOperation({
        //         target: HASH_CONTRACT_ADDRESS, //need to update
        //         data: encodeFunctionData({
        //             abi: contractABI, //need to update
        //             functionName: "claimWithDiscount",
        //             args: [BigInt(tid)]
        //         }),
        //         value: ethers.utils.parseEther("0.1").toBigInt()
        //     });
        //     const response = await signer?.waitForUserOperationTransaction(hash);
        //     console.log("mintResponse", response);
        //     toast(`TxHash! please check successful or not: ${response}`, {
        //         icon: "✅",
        //         style: toastStyle,
        //         position: "bottom-center",
        //     });
        //     setHashWLLoader(false);
        // } catch (error) {
        //     setHashWLLoader(false);
        //     console.error(error)
        //     toast(`Error!: ${error}`, {
        //         icon: "❌",
        //         style: toastStyle,
        //         position: "bottom-center",
        //     });
        // }
    };

    return (
        <UserContext.Provider
            value={{
                handleMint,
                handleWLMint,
                mintLoader,
                mintWLLoader,
                handleHashMint,
                hashloader,
                handleHashDisMint,
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
