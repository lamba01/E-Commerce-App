import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { RiRefund2Line } from 'react-icons/ri'
import { MdSupportAgent } from 'react-icons/md'
import "../Styles/Placeholder.css"

function PlaceHolders() {
  return (
    <div className='placeholder-container'>
        <div className='placeholder'>
        <TbTruckDelivery size={'3em'} className='placeholder-icon'/>
        <h3 className='placeholder-header'>Free shipping</h3>
        <p className='dummy'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className='placeholder'>
        <RiRefund2Line size={'3em'} className='placeholder-icon'/>
        <h3 className='placeholder-header'>100% refund</h3>
        <p className='dummy'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className='placeholder'>
        <MdSupportAgent size={'3em'} className='placeholder-icon'/>
        <h3 className='placeholder-header'>support 24/7</h3>
        <p className='dummy'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
    </div>
  )
}

export default PlaceHolders