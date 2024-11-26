import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { RiRefund2Line } from 'react-icons/ri'
import { MdSupportAgent } from 'react-icons/md'
import "../Styles/Placeholder.css"

function PlaceHolders() {
  return (
    <div className='placeholder-container'>
        <div className='placeholder'>
          <div className="icon-container">
            <TbTruckDelivery size={'2em'} color='white' className='placeholder-icon'/>
          </div> 
        <h3 className='placeholder-header'>Free shipping</h3>
        <p className='dummy'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className='placeholder'>
          <div className="icon-container">
            <RiRefund2Line size={'2em'} color='white' className='placeholder-icon'/>
          </div> 
        <h3 className='placeholder-header'>100% refund</h3>
        <p className='dummy'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className='placeholder'>
        <div className="icon-container">
            <MdSupportAgent size={'2em'} color='white' className='placeholder-icon'/>
          </div> 
        <h3 className='placeholder-header'>support 24/7</h3>
        <p className='dummy'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
    </div>
  )
}

export default PlaceHolders