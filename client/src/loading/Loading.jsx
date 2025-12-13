import React from 'react';

const Loading = ({ width, height, border, topBorder, borderColor, borderTopColor }) => {
  
  const styleLoadingSpinner = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    border: `${border} solid`,
    borderTop: `${topBorder} solid`,
    borderColor: borderColor,
    borderTopColor: borderTopColor,
    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: 'spin 1s linear infinite',
  };

  return <div style={styleLoadingSpinner}></div>;
};

export default Loading;
