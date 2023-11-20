import React, { useState, useRef } from 'react';
import axios from 'axios';
import { AiFillCreditCard, AiOutlineBank, AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { BsPaypal } from 'react-icons/bs'
import { BiLogoVisa } from 'react-icons/bi'
import { FcSimCardChip } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import './payment.css';
// import OrderBtn from '../OrderBtn';

const PaymentSimulation = ({ onClose }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  // const [isFirstFormValid, setIsFirstFormValid] = useState(false);  
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Firstname: '',
    lastname: '',
    address: '',
    phone: '',
    paymentMethod: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
    holdername: '',
  });
  const formRefs = [useRef(null), useRef(null)]; 
  const [isSecondFormValid, setIsSecondFormValid] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

        if (name === 'cardNumber') {
          const numericValue = value.replace(/[^0-9]/g, '');

          // Update the input field with the numeric value
          event.target.value = numericValue;

          // Update the state with the cleaned numeric value
          setFormData({ ...formData, [name]: numericValue });

          // Update the span element with the formatted value
          const formattedValue = numericValue.replace(/(\d{4})/g, '$1 ').trim();
          // If the input field is for card number, update the span element
          const cardNumberSpan = document.getElementById('card-number-span');
          if (cardNumberSpan) {
          cardNumberSpan.textContent = formattedValue;
      }
    }
    if(name === 'expirationMonth') {
      const month = document.getElementById('exp-month')
      month.textContent = value
    }
    if(name === 'expirationYear') {
      const yearr = document.getElementById('exp-year')
      yearr.textContent = value
    }
  };

  const handleCardNameChange = (event) => {
    const { name, value } = event.target;
  
      setFormData({ ...formData, [name]: value });
      const holder = document.getElementById('holder-name')
      holder.textContent = value
    
  };

  const handlePreviousStep = () => {
    if(step > 1){
      setStep(step - 1);
    }
  };
  const handleNextStep = () => {
    // event.preventDefault();
    setStep(step + 1);
  };

  const renderProgressBar = () => {
    const progressBarItems = ['1', '2', '3'];
  return (
    <div className="progress-container">
    <div className="progress-bar">
      {progressBarItems.map((item, index) => (
        <div
          key={index}
          className={`progress-item ${step >= index + 1 ? 'activee' : ''}`}
        >
          {item}
          
        </div>
      ))}
    </div>
    <div className="progress-line" />
  </div>
  );
};
const handleSubmit = (formIndex) => {
  const form = formRefs[formIndex].current;

  if (form.checkValidity()) {
    if (formIndex === 1) {
      setIsSecondFormValid(true);
      placeOrder()
    }

    // Proceed to the next step
    handleNextStep();
  } else {
    if (formIndex === 1) {
      setIsSecondFormValid(false);
    }

    // Handle validation errors or provide feedback to the user
    form.reportValidity();
  }
};
const apiUrl = 'https://app-chi-pink.vercel.app'; 

const placeOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please log in to place an order.');
      return;
    }

    // Make a request to your server to place the order with the JWT token
    const response = await axios.post(`${apiUrl}/api/place-order`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('Order placed successfully');
      // Clear all quantities from local storage
      clearAllQuantities();
      // After successfully placing the order, send the email confirmation
      await handleSendEmailConfirmation(token);
    }
  } catch (error) {
    console.error('Error placing the order:', error);
    alert('Error placing the order. Please try again or contact support.');
  } 
};
const handleSendEmailConfirmation = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/api/send-email-confirmation`, 
    {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('Email confirmation sent:');
    }
  } catch (error) {
    console.error('Error sending email confirmation:', error);
  }
}

// Function to clear all quantities from local storage
const clearAllQuantities = () => {
  // Iterate through all keys in local storage and remove those related to quantities
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('product_') && key.endsWith('_quantity')) {
      localStorage.removeItem(key);
    }
  }
};


const navigate = useNavigate();

const goBackToShop = () => {
  navigate('/'); // Use navigate to go back to the product list
};



  return (
    <div className="payment-simulation">
      <div className="payment-container">
      <div className='btns'><AiOutlineArrowLeft className='iis' size={'1.5em'} onClick={handlePreviousStep}/>
      <AiOutlineClose onClick={onClose} size={'1.5em'} className='iis'/></div>
      <h2 className='paymentheader'>Make Payment</h2>
      {renderProgressBar()}
        <div className={`step ${step === 1 ? 'active3' : ''}`}>       
          <form className='forms' ref={formRefs[0]}>
            <div>
              <input
              type="text"
              name="Firstname"
              className='name'
              placeholder="First Name"
              pattern="[A-Za-z ]+"
              value={formData.Firstname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastname"
              className='name'
              pattern="[A-Za-z ]+"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
            <div>
            <h5 className='paymethod'>Select Method of Payment</h5>
            <div className={`radio-group ${selectedPaymentMethod === 'creditCard' ? 'checked' : ''}`}>
            <div className='inner'><AiFillCreditCard color='#40bfff' size={'12px'}/>
            <label>Credit Card or Debit</label></div>
           <input 
           type="radio" 
           name="paymentMethod" 
           value="creditCard"
           checked={selectedPaymentMethod === 'creditCard'}
           onChange={handlePaymentMethodChange} 
           />
           </div>
          <div className={`radio-group ${selectedPaymentMethod === 'paypal' ? 'checked' : ''}`}>
            <div className='inner'>
            <BsPaypal color='#40bfff' size={'12px'}/>         
            <label>Paypal</label></div>
          <input 
          type="radio" 
          name="paymentMethod" 
          value="paypal" 
          checked={selectedPaymentMethod === 'paypal'}
          onChange={handlePaymentMethodChange} 
          />
          </div>
          <div className={`radio-group ${selectedPaymentMethod === 'bankTransfer' ? 'checked' : ''}`}>
          <div className='inner'><AiOutlineBank color='#40bfff' size={'12px'}/>
          <label>Bank Transfer</label></div>
          <input 
          type="radio" 
          name="paymentMethod" 
          value="bankTransfer" 
          checked={selectedPaymentMethod === 'bankTransfer'}
          onChange={handlePaymentMethodChange} 
          />
          </div>  
            </div>
           </div>
           <div>
           <input
              type="text"
              name="phone"
              className='phone'
              placeholder="Mobile Phone"
              pattern="[0-9]*"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <textarea 
            name="address" 
            className='adress' 
            required 
            placeholder="Address for Delivery"  
            value={formData.address}
            onChange={handleInputChange} id="" cols="30" rows="10"></textarea>
           </div>                    
          </form>
          <button type='submit' className='formm1' onClick={() => handleSubmit(0)}>Go to Payment</button> 
        </div>

        <div className={`step ${step === 2 ? 'active3' : ''}`}>
          <div className="second">
          <div className='card-containeer'>
            <div className="card">
            <div className="logoss">
              <FcSimCardChip size={'2em'}/><BiLogoVisa size={'4em'}/></div>
              <div className="card-content">
              <span className='card-number' id="card-number-span" >1234 5678 9012 3456 </span>
              <div className='card-content-sub'><h4 className='card-name' id='holder-name'>John Doe</h4>
              <div className='expp'><p id='exp-month'>00</p>/<p id='exp-year'>0000</p></div></div>
            </div>
            </div>
            
          </div>
          <form className='sec-form' ref={formRefs[1]}>
            <div>
              <input
              type="text"
              name="cardNumber"
              className='cn'
              pattern="[0-9]{16}"
              minLength={16}
              maxLength={16}
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            /></div>
            <div className='aa'>
            <input type="text"
             maxLength={2}
            placeholder='0'
            pattern="[0-9]*"
            value={formData.expirationMonth}
            onChange={handleInputChange}
            name="expirationMonth"
            required
            className='expm'
            />
            <input
              type="text"
              name="expirationYear"
              placeholder="YYYY"
              value={formData.expirationYear}
              pattern="[0-9]*"
              maxLength={4}
              required
              onChange={handleInputChange}
              className='expy'
            />
            <input
              type="text"
              name="cvv"
              className='cvv'
              placeholder="CVV"
              pattern="[0-9]{3}"
              maxLength={3}
              value={formData.cvv}
              onChange={handleInputChange}
              required
            /></div>
            <div>
            <input
              type="text"
              name="holdername"
              className='hn'
              placeholder="Holder Name"
              pattern="[A-Za-z ]*"
              value={formData.holdername}
              onChange={handleCardNameChange}
              required
              title="Please enter a valid first name (only alphabetic characters and spaces)."
            />
            </div>
          </form>
          </div>  
          <div onClick={() => handleSubmit(1)}><button className='formm2' onClick={() => handleSubmit(1)}>Go to Confirmation</button></div>
        </div>
        <div className={`step ${step === 3 ? 'active3' : ''}`}>
        <div className='check'>
          <div className="check-container"><AiOutlineCheck size={'2em'} color='white'/></div>
          <h2>Success</h2>
          <p>Thank you for your order! Your payment was successful.</p></div>
          <div><button className='formm2' onClick={goBackToShop} >Complete</button></div>  
        </div>
      </div>
    </div>
  );
};
export default PaymentSimulation;
