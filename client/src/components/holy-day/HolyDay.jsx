import React from 'react'
import useInformation from '../../hooks/useInformation';

const HolyDay = () => {

  const { getInformation } = useInformation();

  const isQuillEmpty = (html) => {
    if (!html) return true;

    const cleaned = html
      .replace(/<p><br><\/p>/g, "")
      .replace(/<p><\/p>/g, "")
      .replace(/<br>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/<(.|\n)*?>/g, "") // remove all HTML tags
      .trim();

    return cleaned.length === 0;
  };

   
  if (isQuillEmpty(getInformation?.holyday)) {
    return null 
  }

  return (
    <div>
      <div className='bg-black sticky top-0 flex items-center text-red-500 border font-medium border-red-500 rounded text-center justify-center py-3 text-sm'>
        <div dangerouslySetInnerHTML={{__html: getInformation?.holyday}} />
      </div>
    </div>
  )
}

export default HolyDay