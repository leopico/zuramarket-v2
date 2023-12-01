import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import { useState } from 'react';
import { ethers } from "ethers";
import abi from "../const/blockchain/abi.json"
import { IHybridPaymaster, SponsorUserOperationDto, PaymasterMode } from '@biconomy/paymaster'
import { BiconomySmartAccount } from "@biconomy/account"
import styles from '@/styles/Home.module.css'
import WalletConnectContext from "./WalletContext";

const nftAddress = "0xb97a934761b902D3C1D59e241514dF75a715eBCd"

interface MessageContextValue {
    handleMint: () => void
}

const SetContractContext = createContext<MessageContextValue>({
    handleMint: () => { },
});


export const SetContractContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [loader, setLoader] = useState<boolean>(false)

    const { smartAccount, provider, address } = useContext(WalletConnectContext);

    const handleMint = async () => {
        if (provider && smartAccount) {
            const contract = new ethers.Contract(nftAddress, abi, provider);
            try {
                const minTx = await contract.populateTransaction.safeMint(address);
                console.log(minTx.data);
                const tx1 = {
                    to: nftAddress,
                    data: minTx.data,
                };
                let userOp = await smartAccount.buildUserOp([tx1]);
                console.log({ userOp });
                const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
                let paymasterServiceData: SponsorUserOperationDto = {
                    mode: PaymasterMode.SPONSORED,
                    smartAccountInfo: {
                        name: 'BICONOMY',
                        version: '2.0.0'
                    },
                };
                const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(
                    userOp,
                    paymasterServiceData
                );
                userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
                const userOpResponse = await smartAccount.sendUserOp(userOp);
                console.log("userOpHash", userOpResponse);
                const { receipt } = await userOpResponse.wait(1);
                console.log("txHash", receipt.transactionHash);
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <SetContractContext.Provider
            value={{ handleMint }}
        >
            {children}
        </SetContractContext.Provider>
    );
};

// Define the propTypes for MessageContextProvider
SetContractContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default SetContractContext;
