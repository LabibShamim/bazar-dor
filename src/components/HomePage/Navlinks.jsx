import React from 'react';
import Link from 'next/link';

const Navlinks = async() => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
    const data = await res.json();
    return (
        <div className='flex gap-5 border-mauve-200 border-t-1 max-w-7xl mx-auto p-2'>
           {data.map((n,i) => <Link key={i} href={n.slug} >{n.icon}{n.nameBn}</Link>)}
        </div>
    );
};

export default Navlinks;