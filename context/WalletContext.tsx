import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useEthereum, useConnect, useAuthCore } from "@particle-network/auth-core-modal";
import { PolygonMumbai } from "@particle-network/chains";
import { AAWrapProvider, SmartAccount, SendTransactionMode } from "@particle-network/aa";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";


interface MessageContextValue {
  login: (authType: any) => void
  logout: () => void
  balance: string
  loader: boolean
  addr: string
  address: string
}

const WalletConnectContext = createContext<MessageContextValue>({
  login: () => { },
  logout: () => { },
  balance: "",
  loader: false,
  addr: "",
  address: ""
});


export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState("");
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState("");

  let addr = "";

  if (address && typeof address === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = address.slice(0, 5);
    const secondCharOfAddress = address.slice(39);
    addr = firstCharOfAddress + "..." + secondCharOfAddress;
  };

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

  const gaslessProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless) || null, "any")

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    };
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
        toast(`logged in successfully!`, {
          icon: "✅",
          style: toastStyle,
          position: "bottom-center",
        });
        setLoader(false);
      };
    } catch (error) {
      toast(`Error!: ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
      console.log(error);
    }
  };

  const logout = async () => {
    if (userInfo) {
      await disconnect();
    }
  };

  return (
    <WalletConnectContext.Provider
      value={{ login, balance, logout, loader, addr, address }}
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
