import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async() => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
    const data = await res.json();

    return (
        <div className=' border-1  border-mauve-200'>
            <MarqueeText direction="right" duration={10} className='flex gap-5 border-mauve-200 '>
            {data.filter((marque) => marque.change.pct !== 0).map(marque => 
            <span key={marque.id} className='flex items-center gap-5 p-2 border-r-1  border-mauve-200'>
                <span>{marque.image}{marque.nameBn}</span>
                <span>{marque.today} টাকা/কেজি</span>
                <span style={{color:marque.change.pct > 0 ? "red" : marque.change.pct < 0? "green": "gray",}}>

              {marque.change.pct > 0 ? "▲": marque.change.pct < 0 ? "▼": " "}{" "}
              {marque.change.pct}%
            </span>
            </span> )}
            </MarqueeText>
        </div>
    );
};

export default Marquee;