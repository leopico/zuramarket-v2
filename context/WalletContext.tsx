import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { IPaymaster, BiconomyPaymaster } from '@biconomy/paymaster'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ethers } from 'ethers';
import { ChainId } from "@biconomy/core-types"
import { ParticleAuthModule, ParticleProvider } from "@biconomy/particle-auth";
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";

const particle = new ParticleAuthModule.ParticleNetwork({
  projectId: "c0de07ad-1fca-44dc-94a4-accf4b9348f1",
  clientKey: "cC8QRaFuPPT5Vc31eNLM6pEVgBu5FJ4eQ9z8fhpW",
  appId: "cee324cc-49bb-4442-909a-fb71f7b4e429",
  wallet: {
    displayWalletEntry: true,
    defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
  },
});


const bundler: IBundler = new Bundler({
  // get from biconomy dashboard https://dashboard.biconomy.io/
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',
  chainId: ChainId.POLYGON_MUMBAI,// or any supported chain of your choice
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})


const paymaster: IPaymaster = new BiconomyPaymaster({
  // get from biconomy dashboard https://dashboard.biconomy.io/
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/kRH9NwVgd.316456c8-d469-4755-a40a-69f9a36652cf'
})


interface MessageContextValue {
  connect: () => void
  logout: () => void
  loading: boolean
  smartAccount: BiconomySmartAccountV2 | null
  provider: ethers.providers.Provider | null
  address: string
  addr: string
}

const WalletConnectContext = createContext<MessageContextValue>({
  connect: () => { },
  logout: () => { },
  loading: false,
  smartAccount: null,
  provider: null,
  address: "",
  addr: ""
});


export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)

  // console.log(address);

  let addr = "";

  if (address && typeof address === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = address.slice(0, 5);
    const secondCharOfAddress = address.slice(39);
    addr = firstCharOfAddress + "..." + secondCharOfAddress;
  }


  const connect = async () => {
    try {
      setLoading(true);
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );
      setProvider(web3Provider);

      const modulepartial = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
      })

      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: modulepartial,
        activeValidationModule: modulepartial
      })

      const address = await biconomySmartAccount.getAccountAddress();
      setAddress(address);
      setSmartAccount(biconomySmartAccount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await particle.auth.logout();
      setAddress("");
      setSmartAccount(null);
      setProvider(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WalletConnectContext.Provider
      value={{ connect, logout, loading, smartAccount, provider, address, addr }}
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
