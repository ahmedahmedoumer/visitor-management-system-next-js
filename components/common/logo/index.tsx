import React from 'react';
import { Image } from 'antd';
interface LogoProps {
  type: string;
}

const Logo: React.FC<LogoProps> = ({ type }) => {
  switch (type) {
      case 'Visitor':
        return (
               <Image
                  width={240}
                  height={240} // Adjust the height as needed
                  src="/sheraton_logo.jpg" // Path to the image in the public folder
                  alt="Sheraton Logo" // Provide an alt text for accessibility
                />
        );
    default:
      return null;
  }
};

export default Logo;
