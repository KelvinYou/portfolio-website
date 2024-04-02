import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { ServicePackage } from '@/types/services';
import BaseButton from '../ui/BaseButton';

interface ServicePackageCardProps {
  service: ServicePackage;
  index: number;
}

const ServiceCard: FC<ServicePackageCardProps> = ({ service, index }) => {
  const router = useRouter();

  const shareToWhatsApp = (servicePackage: string) => {

    const text = `Hi Kelvin, I would like to know more about this ${servicePackage}`;
    window.open(`https://wa.me/+60183732752?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={fadeIn("up", "spring", index * 0.1, 0.75)} 
      className='sm:w-[360px] w-full cursor-pointer'
      // onClick={() => router.push(`/projects/${project._id}`)}
    >
      <Tilt
        options={{
          max: 0,
          scale: 1.1,
          speed: 450,
        }}
        className={`${service.tag ? 'bg-tertiary' : 'bg-tertiary/30'} p-5 first-line:p-5 rounded-md h-full relative`}
      >
        {service.tag && 
          <div className='bg-on-primary px-3 py-2 absolute -top-4 text-sm right-4 rounded-full'>
            {service.tag}
          </div>
        }
        <div className="text-lg text-[#F3F4F6] mb-2">
          {service.title}
        </div>

        <div className='mb-4'>
          <span className='text-sm text-[#9CA3AF] mr-2'>start from</span>
          <span className='text-[24px] text-[#9CA3AF] mr-1'>RM</span>
          <span className='text-[30px] text-[#F3F4F6]'>{service.startFromPrice}</span>
          <span className='text-[24px] text-[#9CA3AF]'>.00</span>
        </div>

        <div className="text-sm text-[#9CA3AF]">
          {service.description}
        </div>

        <div className='mt-6'>
          <BaseButton 
            className=''
            onClick={() => shareToWhatsApp(service.title)}
          >
            Contact Me
          </BaseButton>
        </div>
      </Tilt>
    </motion.div>
  )
}

export default ServiceCard