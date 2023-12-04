import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useEthereum, useConnect, useAuthCore } from "@particle-network/auth-core-modal";
import { PolygonMumbai } from "@particle-network/chains";
import { AAWrapProvider, SmartAccount, SendTransactionMode } from "@particle-network/aa";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import abi from "../const/blockchain/abi.json"

const nftAddress = "0xb97a934761b902D3C1D59e241514dF75a715eBCd"

interface MessageContextValue {
  login: (authType: any) => void
  logout: () => void
  handleMint: () => void
  executeUserOp: () => void
  balance: string
  loader: boolean
  loading: boolean
  addr: string
}

const WalletConnectContext = createContext<MessageContextValue>({
  login: () => {},
  logout: () => {},
  handleMint: () => {},
  executeUserOp: () => {},
  balance: "",
  loader: false,
  loading: false,
  addr: ""
});


export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");


  let addr = "";

  if (address && typeof address === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = address.slice(0, 5);
    const secondCharOfAddress = address.slice(39);
    addr = firstCharOfAddress + "..." + secondCharOfAddress;
  };

  const smartAccount = new SmartAccount(provider, {
    projectId: "c0de07ad-1fca-44dc-94a4-accf4b9348f1",
    clientKey: "cC8QRaFuPPT5Vc31eNLM6pEVgBu5FJ4eQ9z8fhpW",
    appId: "cee324cc-49bb-4442-909a-fb71f7b4e429",
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

  const gaslessProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless) || null, "any")



  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    setAddress(address);
    const balanceResponse = await gaslessProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse));
  };


  const login = async (authType: any) => {
    try {
      if (!userInfo) {
        setLoader(true);
        await connect({
          socialType: authType,
          chain: PolygonMumbai
        });
        setLoader(false);
      };
    } catch (error) {
      console.log(error)
    }
  };

  const executeUserOp = async () => {
    try {
      const signer = gaslessProvider.getSigner();
      const tx = {
        to: "0x0000000000000000000000000000000000000000",
        value: ethers.utils.parseEther("0.001")
      };
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();
      toast(`success!: ${txReceipt.transactionHash}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      toast(`Error!: ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handleMint = async () => {
    try {
      setLoading(true)
      const signer = gaslessProvider.getSigner();
      const contract = new ethers.Contract(nftAddress, abi, signer );
      const tx = await contract.safeMint(address);
      const txreceipt = await tx.wait();
      // console.log(txreceipt);
      toast(`TxHash!: ${txreceipt.transactionHash}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
      setLoading(false)
    } catch (error) {
      setLoading(false);
      toast(`Error!: ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  }

  const logout = async () => {
    if (userInfo) {
      await disconnect();
    }
  }



  return (
    <WalletConnectContext.Provider
      value={{ login, executeUserOp, balance, logout, loader, handleMint, loading, addr }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
WalletContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default WalletConnectContext;
