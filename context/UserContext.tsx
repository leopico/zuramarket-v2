import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { HOUSE_CONTRACT_ADDRESS, HASH_CONTRACT_ADDRESS } from "../const/constant";

import { encodeFunctionData, parseAbi } from 'viem';
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs"

import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import WalletConnectContext from "./WalletContext";

import { ethers } from "ethers";


const nftAddress = "0x795EF5Da7FfA14CBc42DB628F0a0d44FD36545Dd";


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

    const addresses = [
        "0x9BaC0A3CdF46F59e9624c23A6E9618eEf267FFC6",
    ]


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
        try {
            setMintLoader(true);
            const contractABI = parseAbi([
                'function mint(uint256 _id) external nonReentrant isAddress(msg.sender)'
            ]);

            const { hash }: any = await signer?.sendUserOperation({
                target: HOUSE_CONTRACT_ADDRESS, // need to update
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
        if (!signer) {
            console.log("Please refresh and login again!");
            toast(`logged out in successfully!`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
            });
            return;
        }
        try {
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
                target: HOUSE_CONTRACT_ADDRESS, //need to update
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
