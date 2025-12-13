import React from 'react'
import useInformation from '../../hooks/useInformation';
import '../../style/holyDay.css'


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
      <div className='sticky top-0 flex items-center text-red-600 bg-black text-sm text-center justify-center py-4 holyDaysAnimation'>
        <div className='z-50' dangerouslySetInnerHTML={{__html: getInformation?.holyday}} />
      </div>
    </div>
  )
}

export default HolyDay