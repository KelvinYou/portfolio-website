import { socialMedia } from '@/constants/data';
import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SocialMediaIcons = {
  Github: <Github size={20} />,
  Instagram: <Instagram size={20} />,
  LinkedIn: <Linkedin size={20} />,
};

type SocialMediaName = keyof typeof SocialMediaIcons;

const SocialMediaIcon: React.FC<{ name: SocialMediaName }> = ({ name }) => (
  <div className='flex items-center justify-center h-full'>
    {SocialMediaIcons[name]}
  </div>
);

const SocialMediaLink: React.FC<{ link: string; name: SocialMediaName }> = ({ link, name }) => (
  <Link
    href={link}
    target="_blank"
    type="button"
    className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
    data-te-ripple-init
    data-te-ripple-color="light"
  >
    <SocialMediaIcon name={name} />
  </Link>
);

const Footer: React.FC = () => (
  <footer className="mt-[300px]">
    <div className="w-full text-center">
      <div className="mb-6 flex justify-center gap-1">
        {socialMedia.map((media, index) => (
          <SocialMediaLink key={index} link={media.link} name={media.name as SocialMediaName} />
        ))}
      </div>
    </div>

    <div className="w-full p-4 text-center bg-primary text-white">
      © 2023 Copyright: {" "}
      <a className="text-white" href="">
        Kelvin You
      </a>
    </div>
  </footer>
);

export default Footer;
