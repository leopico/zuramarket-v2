import { createContext } from "react";
import PropTypes from "prop-types";

const nftAddress = "0xb97a934761b902D3C1D59e241514dF75a715eBCd"

interface MessageContextValue {
    handleMint: () => void
}

const SetContractContext = createContext<MessageContextValue>({
    handleMint: () => {},
});


export const SetContractContextProvider = ({ children }: { children: React.ReactNode }) => {


    const handleMint = () => {
        alert("hello world");
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
