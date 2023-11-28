import { socialMedia } from '@/constants/data'
import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const SocialMediaIcons = {
  Github: <Github size={20} />,
  Instagram: <Instagram size={20} />,
  LinkedIn: <Linkedin size={20} />,
};

type SocialMediaName = keyof typeof SocialMediaIcons;

const SocialMediaIcon: React.FC<{ name: SocialMediaName }> = ({ name }) => (
  <div className='flex items-center justify-center h-full text-white hover:text-on-primary'>
    {SocialMediaIcons[name]}
  </div>
);

const SocialMediaLink: React.FC<{ link: string; name: SocialMediaName }> = ({ link, name }) => (
  <Link
    href={link}
    target="_blank"
    type="button"
    className="m-1 h-9 w-9 uppercase leading-normal transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
    data-te-ripple-init
    data-te-ripple-color="light"
  >
    <SocialMediaIcon name={name} />
  </Link>
);

const SocialMediaButtons = () => {
  return (
    <div className="flex justify-center gap-1">
      {socialMedia.map((media, index) => (
        <SocialMediaLink key={index} link={media.link} name={media.name as SocialMediaName} />
      ))}
    </div>
  )
}

export default SocialMediaButtons