import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Container from '../../components/Container/Container';
import AdminHouseContext from '../../context/AdminHouseContext';
import WalletConnectContext from '../../context/WalletContext';

const AdminPage = () => {
  const router = useRouter();
  const address = router.query.address;
  const [pmSupply, setPmSupply] = useState<number>(0);
  const [wlSupply, setWlSupply] = useState<number>(0);
  const [tokenURI, setTokenURI] = useState<string>("");

  const { chainId } = useContext(WalletConnectContext);

  const {
    handlePmMode, pmLoader, handlePmLimit, pmLimitLoader, handleWlMode, wlLoader,
    handleWlLimit, wlLimitLoader, handleTkURI, tokenLoader, handlePMinted, pMintedLoader,
    handleWlMinted, wlMintedLoader
  } = useContext(AdminHouseContext);

  return (
    <Container maxWidth='lg'>
      <div className=''>
        <div className='container mx-auto max-w-md'>
          <small className='text break-words'>Admin: <strong>{address}</strong></small><br />
          <small className='text break-words text-lime-500'>ChainId: <strong>{chainId}</strong></small><br />
          <div className='flex flex-col items-start space-y-9 pt-3'>
            <span className=' underline underline-offset-8 text-center'>House NFT</span>

            <div className='flex justify-between items-center w-full'>
              <label className='text-xs sm:text-sm md:text-base'>Get total minted by PM:</label>
              <button onClick={handlePMinted} className='bg-blue-cus px-2 py-1 rounded w-36'>
                {pMintedLoader ? "loading" : "Get"}
              </button>
            </div>

            <div className='flex justify-between items-center w-full'>
              <label className='text-xs sm:text-sm md:text-base'>Get total minted by WL:</label>
              <button onClick={handleWlMinted} className='bg-blue-cus px-2 py-1 rounded w-36'>
                {wlMintedLoader ? "loading" : "Get"}
              </button>
            </div>

            <div className='flex justify-between items-center w-full'>
              <label className='text-xs sm:text-sm md:text-base'>Switch PM Mode:</label>
              <button onClick={handlePmMode} className='bg-blue-cus px-2 py-1 rounded w-36'>
                {pmLoader ? "loading..." : "switch"}
              </button>
            </div>

            <div className='flex justify-between items-center w-full'>
              <label className='text-xs sm:text-sm md:text-base'>Switch WL Mode:</label>
              <button onClick={handleWlMode} className='bg-blue-cus px-2 py-1 rounded w-36'>
                {wlLoader ? "loading..." : "switch"}
              </button>
            </div>

            <div className='space-y-3 flex flex-col'>
              <label className='text-xs sm:text-sm md:text-base'>Set PM Supply Mint:</label>
              <div className='flex justify-between items-center w-full'>
                <input className=' px-2 py-1 rounded w-full' value={pmSupply} type='number'
                  onChange={(e) => setPmSupply(Number(e.target.value))}
                />
                <button onClick={() => handlePmLimit(pmSupply, setPmSupply)} className='bg-blue-cus px-2 py-1 rounded w-36'>
                  {pmLimitLoader ? "loading..." : "Set"}
                </button>
              </div>
            </div>

            <div className='space-y-3 flex flex-col'>
              <label className='text-xs sm:text-sm md:text-base'>Set WL Supply Mint:</label>
              <div className='flex justify-between items-center w-full'>
                <input className=' px-2 py-1 rounded w-full' value={wlSupply} required
                  onChange={(e) => setWlSupply(Number(e.target.value))}
                />
                <button className='bg-blue-cus px-2 py-1 rounded w-36'
                  onClick={() => handleWlLimit(wlSupply, setWlSupply)}
                >
                  {wlLimitLoader ? "loading..." : "Set"}
                </button>
              </div>
            </div>


            <div className='space-y-3 flex flex-col'>
              <label className='text-xs sm:text-sm md:text-base'>Set Token URI:</label>
              <div className='flex justify-between items-center w-full'>
                <input className=' px-2 py-1 rounded w-full'
                  onChange={(e) => setTokenURI(e.target.value)}
                />
                <button className='bg-blue-cus px-2 py-1 rounded w-36'
                  onClick={() => handleTkURI(tokenURI, setTokenURI)}
                >
                  {tokenLoader ? "loading" : "set"}
                </button>
              </div>
            </div>

            <div className='container mx-auto border border-b-2 border-neutral-400' />

          </div>

          <div className='flex flex-col space-y-9 pt-3'>
            <span className=' underline underline-offset-8 text-center'>Hash NFT</span>
            <span>coming soon...</span>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
