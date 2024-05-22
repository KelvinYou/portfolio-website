import React from 'react'
import "@/styles/index.css"

export const ICON_TYPE = {
  LOCATION_OUTLINE: "location_outline",
  OPEN_LINK_OUTLINE: "open_link_outline",
  CLOCK: "clock",
  CLOCK_OUTLINE: "clock_outline",
}

const svgIcons = [
  {
    name: ICON_TYPE.LOCATION_OUTLINE,
    path: <path 
      fillRule="evenodd" 
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" 
      clipRule="evenodd" 
    />,
  },
  {
    name: ICON_TYPE.OPEN_LINK_OUTLINE,
    path: <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd" />,
  },
  {
    name: ICON_TYPE.CLOCK_OUTLINE,
    path: <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" 
    />,
  },
]

type SvgIconType = {
  type?: string;
  color?: string;
  size?: number;
}

const SvgIcon = (props: SvgIconType) => {
  const { 
    color = '#FFF',
    type = ICON_TYPE.LOCATION_OUTLINE,
    size = 24,
  } = props;

  const icon = svgIcons.find((svgIcon) => svgIcon.name === type);

  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox={`0 0 24 24`}
    fill={color} 
    width={size}
    height={size}>
      {icon?.path}
    </svg>
  )

}

export default SvgIcon