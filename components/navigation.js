import React from 'react';
import Link from 'next/link';

const Navigation = () => {
    return (
        <div>
            <Link href="/">
                <a>Home</a>
            </Link>
            &nbsp;|&nbsp;
            <Link href="/about-us">
                <a>About Us</a>
            </Link>
            {/* &nbsp;|&nbsp; 
            <Link href="/category/1">
                <a>Category One</a>
            </Link> */}
            &nbsp; | &nbsp;
            <Link href="/cart">
                <a>Cart</a>
            </Link>
        </div>
    );
}

export default Navigation;
