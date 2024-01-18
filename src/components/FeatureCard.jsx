import React from 'react'

export default function FeatureCard(props) {
  return (
    <div className='flex flex-col justify-center items-center flex-wrap '>
    <img src={props.imageUrl} alt="" />
      <h4 className='text-2xl font-bold mb-2'>{props.title}</h4>
      <p className='text-zinc-500 text-center lg:px-4 px-10'>{props.content}</p>
    </div>
  )
}
