import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const DropdownInfo = ({info}) => {
     const {header,content } = info

     const [isInfoVisible, setIsInfoVisible] = useState(false);
  
  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };
     return (
          <div className="ml-5 flex flex-col items-center">
      <h1
        className="flex items-center gap-2 font-semibold text-lg text-[#2383a1] cursor-pointer"
        onClick={toggleInfoVisibility}
      >
        {header}{" "}
        {isInfoVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </h1>

      {isInfoVisible && (
        <p className="mt-2 text-gray-600">
          {content}
        </p>
      )}
    </div>
     );
};

export default DropdownInfo;