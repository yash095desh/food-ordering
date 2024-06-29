import React from 'react'

function SectionHeading({heading,subheading}) {
  return (
    <div className=' text-center mb-2'>
    <h3 className='uppercase font-bold text-xl text-gray-400' >{heading}</h3>
    <h1 className='text-5xl text-primary italic font-bold'>{subheading}</h1>
</div>
  )
}

export default SectionHeading 