import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image width="400px" height="400px" src="/loader.gif" quality={100} />
    </div>
  );
};
export default Loader;
