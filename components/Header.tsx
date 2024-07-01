import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="relative p-16 text-center">
      <Link href="/">
        <h1 className="text-6xl font-black">StoryTeller AI</h1>
        <div className="flex justify-center whitespace-nowrap space-x-5 text-3xl lg:text-5xl">
          <h2>Bringing your stories</h2>
          <div className="relative">
            <div className="absolute bg-purple-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"/>
            <p className="relative text-white">To life!</p>
          </div>
        </div>
      </Link>
      <div>
        
      </div>
    </header>
  )
}

export default Header