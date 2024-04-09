import SocialMediaButtons from '@/components/SocialMediaButtons';
import { socialMedia } from '@/constants/data';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => (
  <footer className="mt-[300px] bg-tertiary">
    <div className="w-full text-center py-4">
      <SocialMediaButtons />
    </div>

    <div className="w-full p-4 text-center text-white">
      © {new Date().getFullYear()} Copyright: {" "}
      <a className="text-white" href="">
        Kelvin You
      </a>
    </div>
  </footer>
);

export default Footer;
