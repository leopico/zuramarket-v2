import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ECDSAProvider, getRPCProviderOwner } from '@zerodev/sdk'
import { Web3Auth } from "@web3auth/modal"
import { CHAIN_NAMESPACES, IProvider } from '@web3auth/base'

import { ethers } from "ethers";
import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";

interface MessageContextValue {
  login: () => void
  logout: () => void
  loader: boolean
  logoutLoader: boolean
  address: string
  addr: string
  balance: string
  signer: ECDSAProvider | null
  loadingInit: boolean,
  provider: IProvider | null
}

const WalletConnectContext = createContext<MessageContextValue>({
  login: () => { },
  logout: () => { },
  loader: false,
  logoutLoader: false,
  address: "",
  addr: "",
  balance: "",
  signer: null,
  loadingInit: false,
  provider: null
});


export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [signer, setSigner] = useState<ECDSAProvider | null>(null);
  const [loadingInit, setLoadingInit] = useState(true);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [balance, setBalance] = useState<string>("");
  // console.log(address);
  

  let addr = "";

  if (address && typeof address === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = address.slice(0, 5);
    const secondCharOfAddress = address.slice(39);
    addr = firstCharOfAddress + "..." + secondCharOfAddress;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const auth = new Web3Auth({
          clientId: "BKSVKRjxiK3OYqrH94cjJKPpXwQ0DHBc8IBiDK2iUpouHpvdnObI3ngbs1GQzI7gWKFtJ9xnai0mRvJ5ceT-xLE",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc.ankr.com/polygon_mumbai/0c93d6a66d3380a8c125a7e1ce13378eaf03bfa0aa7a8688da1caa10f415dd70"
          },
          web3AuthNetwork: "sapphire_devnet"
        });
        await auth.initModal();
        setWeb3Auth(auth);
        if (signer) {
          setSigner(signer);
        }
      } catch (error) {
        console.error(error);
        toast(`Please refresh and login again`, {
          icon: "❌",
          style: toastStyle,
          position: "bottom-center",
        });
      } finally {
        setLoadingInit(false); //check provider to get surely
      }
    };
    init();
  }, [signer])

  const login = async () => {
    try {
      if (!web3auth) {
        console.error("Web3Auth not initialized yet");
        toast(`Please refresh and login again`, {
          icon: "❌",
          style: toastStyle,
          position: "bottom-center",
        });
        return;
      }
      setLoader(true);
      const web3authProvider = await web3auth.connect();
      if (!web3authProvider) {
        console.error("Web3Auth provider not available");
        toast(`Please refresh and login again`, {
          icon: "❌",
          style: toastStyle,
          position: "bottom-center",
        });
        setLoader(false);
        return;
      }
      setProvider(web3authProvider);
      const signer = await ECDSAProvider.init({
        projectId: "819e434d-fb8f-41d0-bf5c-25da54c66894",
        owner: getRPCProviderOwner(web3authProvider),
        opts: {
          paymasterConfig: {
            policy: "VERIFYING_PAYMASTER",
          }
        }
      });

      if (!signer) {
        console.error("Unable to initialize ECDSAProvider");
        toast(`Please refresh and login again`, {
          icon: "❌",
          style: toastStyle,
          position: "bottom-center",
        });
        setLoader(false);
        return;
      };
      setSigner(signer);

      toast(`logged in successfully!`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
      
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Login error", error);
      toast(`Error!: ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  

  const logout = async () => {
    try {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      };
      setLogoutLoader(true);
      await web3auth.logout();
      setSigner(null);
      setProvider(null);
      setWeb3Auth(null);
      setLogoutLoader(false);
      setAddress("");
      setBalance("");
      toast(`logged out successfully!`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      console.log("logout", error);
      toast(`Please refresh and logout again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    const fetchBalance =async () => {
      const zeroAddress = await signer?.getAddress();
      if (!zeroAddress) {
        console.error("Unable to retrieve address from signer");
        toast(`Please refresh and login again`, {
          icon: "❌",
          style: toastStyle,
          position: "bottom-center",
        });
        setLoader(false);
        return;
      };
      setAddress(zeroAddress);

      const ethersProvider = new ethers.providers.Web3Provider(provider as IProvider);
      const zeroBalance = await ethersProvider.getBalance(zeroAddress);
      const zeroBalanceInEther = ethers.utils.formatUnits(zeroBalance, "ether");
      setBalance(zeroBalanceInEther);
    }

    fetchBalance();
  },[provider, signer])

  return (
    <WalletConnectContext.Provider
      value={{
        login,
        logout,
        loader,
        logoutLoader,
        address,
        addr,
        balance,
        signer,
        loadingInit,
        provider
      }}
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
