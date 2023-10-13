import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineTwitter } from 'react-icons/ai';
import { IoLogoDiscord } from "react-icons/io5";
import { BiLogoTelegram } from 'react-icons/bi';
import { AiFillMediumSquare } from "react-icons/ai";
import { BiLogoLinkedinSquare } from "react-icons/bi"
import { useRouter } from "next/router";
import styles from "./Footer.module.css";

const Footer = () => {
    const router = useRouter();

    const handleWhitepaperClick = (event: any) => {
        event.preventDefault();

        const whitepaperPath = '/ZV-Whitepaper-V3-May-23.pdf';

        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = whitepaperPath;
        anchor.download = 'whitepaper.pdf'; // Specify the desired file name

        // Simulate a click on the anchor to trigger the download
        anchor.click();

        // Remove the anchor from the document after a short delay
        setTimeout(() => {
            if (anchor.parentElement) {
                anchor.parentElement.removeChild(anchor);
            }
        }, 100);
    };


    return (
        <footer className="container mx-auto">
            <div className="">
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between px-8 items-center  py-7">
                    <li className={styles.footerImage}>
                        <Link href="https://zuraverse.xyz/" target="_blink">
                            <Image
                                src="/images/logo.png"
                                width={200}
                                height={150}
                                alt="NFT marketplace sample logo"
                            />
                        </Link>
                    </li>
                    <li className=" cursor-pointer  ">
                        <Link href="/" className=" hover:text-hover-cus font-bold tracking-wider ">
                            HOME
                        </Link>
                    </li>
                    <li className=" cursor-pointer  ">
                        <Link href="https://zuraverse.xyz/about-zuraverse/" target="_blink" className=" hover:text-hover-cus font-bold tracking-wider ">
                            ABOUT
                        </Link>
                    </li>
                    <li className=" cursor-pointer  ">
                        <Link href="https://zuraverse.xyz/lore/" target="_blink" className=" hover:text-hover-cus font-bold tracking-wider ">
                            LORE
                        </Link>
                    </li>
                    <li className=" cursor-pointer  ">
                        <Link href="https://zuraverse.xyz/zura-park/" target="_blink" className=" hover:text-hover-cus font-bold tracking-wider ">
                            ZURA PARK
                        </Link>
                    </li>
                    <li className=" cursor-pointer  ">
                        <Link href="https://zuraverse.xyz/zurian/" target="_blink" className="hover:text-hover-cus font-bold tracking-wider ">
                            ZURA NFTS
                        </Link>
                    </li>
                    <li className=" cursor-pointer  ">
                        <a href="#" onClick={handleWhitepaperClick} className="hover:text-hover-cus font-bold tracking-wider">
                            WHITEPAPER
                        </a>
                    </li>
                </ul>
            </div>
            <div className="border-t border-gray-600 container mx-auto" />
            <div className="px-2 py-9">
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-2 lg:space-y-0">
                    <h1 className="text-gray-400">© 2023 Zuraverse. All rights reserved.</h1>
                    <div className="flex space-x-10 justify-between items-center text-sm sm:text-base text-[#b999ff] font-bold">
                        <h1>
                            <Link href="https://zuraverse.xyz/tnc/" target="_blink" className=" hover:text-hover-cus font-bold tracking-wider ">
                                Terms & Conditions
                            </Link>
                        </h1>
                        <h1>
                            <Link href="https://zuraverse.xyz/privacy-policy/" target="_blink" className=" hover:text-hover-cus font-bold tracking-wider ">
                                Privacy Policy
                            </Link>
                        </h1>
                    </div>
                    <div className="flex space-x-4 md:space-x-7 ">
                        <h1>
                            <Link href="https://twitter.com/Zuraverse" target="_blink" className="">
                                <AiOutlineTwitter size={25} color='white' />
                            </Link>
                        </h1>
                        <h1>
                            <Link href="https://discord.com/invite/Scq4geefNG" target="_blink" className="">
                                <IoLogoDiscord size={25} color='white' />
                            </Link>
                        </h1>
                        <h1>
                            <Link href="https://t.me/zuraverse" target="_blink" className="">
                                <BiLogoTelegram size={25} color='white' />
                            </Link>
                        </h1>
                        <h1>
                            <Link href="https://medium.com/@zuraverse" target="_blink" className="">
                                <AiFillMediumSquare size={25} color='white' />
                            </Link>
                        </h1>
                        <h1>
                            <Link href="https://www.linkedin.com/company/zuraverse/mycompany/" target="_blink" className="">
                                <BiLogoLinkedinSquare size={25} color='white' />
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer