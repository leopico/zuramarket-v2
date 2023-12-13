import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { abi } from "../const/blockchain/houseABI.json";
import { HOUSE_CONTRACT_ADDRESS } from "../const/constant";
import WalletConnectContext from "./WalletContext";
import toast from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import { BigNumber, ethers } from "ethers";
import { IProvider } from "@web3auth/base";

interface AdminHouseContextValue {
  handlePmMode: () => void
  pmLoader: boolean
  handlePmLimit: (limit : number, setLimit: React.Dispatch<React.SetStateAction<number>>) => void
  pmLimitLoader: boolean
  handleWlMode: () => void
  wlLoader: boolean
  handleWlLimit: (wlSupply:number, setWlSupply: React.Dispatch<React.SetStateAction<number>>) => void
  wlLimitLoader: boolean
  handleTkURI: (tokenURI:string, setTokenURI: React.Dispatch<React.SetStateAction<string>>) => void
  tokenLoader: boolean
  handlePMinted: () => void
  pMintedLoader: boolean
  handleWlMinted: () => void
  wlMintedLoader: boolean
}

const AdminHouseContext = createContext<AdminHouseContextValue>({
  handlePmMode: () => { },
  pmLoader: false,
  handlePmLimit: () => {},
  pmLimitLoader: false,
  handleWlMode: () => {},
  wlLoader: false,
  handleWlLimit: () => {},
  wlLimitLoader: false,
  handleTkURI: () => {},
  tokenLoader: false,
  handlePMinted: () => {},
  pMintedLoader: false,
  handleWlMinted: () => {},
  wlMintedLoader: false
});


export const AdminHouseContextProvider = ({ children }: { children: React.ReactNode }) => {

  const { provider, web3authAddress} = useContext(WalletConnectContext);
  // console.log("provider", provider);
  // console.log("web3address", web3authAddress)

  const [pmLoader, setPmLoader] = useState(false);
  const [pmLimitLoader, setPMLimitLoader] = useState(false);
  const [wlLoader, setWlLoader] = useState(false);
  const [wlLimitLoader, setWlLimitLoader] = useState(false);
  const [tokenLoader, setTokenLoader] = useState(false);
  const [pMintedLoader, setPMintedLoader] = useState(false);
  const [wlMintedLoader, setWlMintedLoader] = useState(false);


  const connectWithContract =async () => {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(provider as IProvider);
      const etherSigner = ethersProvider.getSigner();
      const contract = new ethers.Contract(HOUSE_CONTRACT_ADDRESS, abi, etherSigner);
      return contract;
    } catch (error) {
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  }
  
  const handlePmMode = async () => {
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
    try {
      setPmLoader(true);
      const contract = await connectWithContract();
      const pmMode = await contract?.setPublicMintingMode();
      setPmLoader(false);
      toast(`Success! ${pmMode}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setPmLoader(false);
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handlePmLimit =async (pmSupply:number, setPmSupply: React.Dispatch<React.SetStateAction<number>>) => {
    console.log("limit", pmSupply);
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
    try {
      setPMLimitLoader(true);
      const contract = await connectWithContract();
      const pmMode = await contract?.setPublicHouseMintingLimit(BigNumber.from(pmSupply));
      const { hash } = await pmMode();
      setPMLimitLoader(false);
      setPmSupply(0);
      toast(`Success! ${hash}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setPmSupply(0);
      setPMLimitLoader(false);
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handleWlMode = async () => {
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
    try {
      setWlLoader(true);
      const contract = await connectWithContract();
      const wlMode = await contract?.setWhitelistMintingMode();
      setWlLoader(false);
      toast(`Success! ${wlMode}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setWlLoader(false);
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handleWlLimit = async (wlSupply:number, setWlSupply: React.Dispatch<React.SetStateAction<number>>) => {
    console.log("limit", wlSupply);
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    };
    try {
      setWlLimitLoader(true);
      const contract = await connectWithContract();
      const wlMode = await contract?.setWhitelistHouseMintingLimit(BigNumber.from(wlSupply));
      const { hash } = await wlMode();
      setWlLimitLoader(false);
      setWlSupply(0);
      toast(`Success! ${hash}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setWlSupply(0);
      setWlLimitLoader(false);
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handleTkURI = async (tokenURI:string, setTokenURI: React.Dispatch<React.SetStateAction<string>>) => {
    console.log("limit", tokenURI);
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    };
    try {
      setTokenLoader(true);
      const contract = await connectWithContract();
      const setUri = await contract?.setURI(tokenURI);
      const { hash } = await setUri();
      setTokenLoader(false);
      setTokenURI("");
      toast(`Success! ${hash}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setTokenLoader(false);
      setTokenURI("");
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handlePMinted = async () => {
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
    try {
      setPMintedLoader(true);
      const contract = await connectWithContract();
      console.log("Contract", contract)
      const pMinted = await contract?.trackPublicHouseMintTotal();
      console.log(pMinted)
      setPMintedLoader(false);
      toast(`Success! ${pMinted}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setPMintedLoader(false);
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };

  const handleWlMinted = async () => {
    if(!provider) {
      toast(`Please refresh and login again`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
    try {
      setWlMintedLoader(true);
      const contract = await connectWithContract();
      const wlMinted = await contract?.trackPublicHouseMintTotal();
      setWlMintedLoader(false);
      toast(`Success! ${wlMinted}`, {
        icon: "✅",
        style: toastStyle,
        position: "bottom-center",
      });
    } catch (error) {
      setWlMintedLoader(false);
      console.log("logout", error);
      toast(`Error! ${error}`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
    }
  };


  return (
    <AdminHouseContext.Provider
      value={{
        handlePmMode,
        pmLoader,
        handlePmLimit,
        pmLimitLoader,
        handleWlMode,
        wlLoader,
        handleWlLimit,
        wlLimitLoader,
        handleTkURI,
        tokenLoader,
        handlePMinted,
        pMintedLoader,
        handleWlMinted,
        wlMintedLoader
      }}
    >
      {children}
    </AdminHouseContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
AdminHouseContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default AdminHouseContext;
