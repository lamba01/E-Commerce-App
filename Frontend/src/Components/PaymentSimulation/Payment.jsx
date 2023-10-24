import React, { useState, useRef } from 'react';
import { AiFillCreditCard, AiOutlineBank, AiOutlineArrowLeft} from 'react-icons/ai'
import { BsPaypal } from 'react-icons/bs'
import { BiLogoVisa } from 'react-icons/bi'
import { FcSimCardChip } from 'react-icons/fc'
import './payment.css';

const PaymentSimulation = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      // Simulate a successful payment (you can add validation logic here)
      handleNextStep();
  };
  const formRef = useRef();
  const handleNextButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }
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


  return (
    <div className="payment-simulation">
      <div className="payment-container">
      <AiOutlineArrowLeft onClick={handlePreviousStep}/>
      <h2 className='paymentheader'>Make Payment</h2>
      {renderProgressBar()}
        <div className={`step ${step === 1 ? 'active' : ''}`}>       
          <form className='forms' onSubmit={handleNextStep} ref={formRef}>
            <div>
              <input
              type="text"
              name="Firstname"
              className='name'
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastname"
              className='name'
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
              name="number"
              className='phone'
              placeholder="Mobile Phone"
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
          <button type="submit" onClick={handleNextButtonClick}>Go to Payment</button> 
        </div>

        <div className={`step ${step === 2 ? 'active' : ''}`}>
          <div className="second">
          <div className='card-containeer'>
            <div className="card">
            <div className="logoss">
              <FcSimCardChip size={'2em'}/><BiLogoVisa size={'4em'}/></div>
              <div className="card-content">
              <span className='card-number'>1234 5678 9012 3456 </span>
              <div><h4 className='card-name'>John Doe</h4>
              <p>00/00</p></div>
            </div>
            </div>
            
          </div>
          <form className='sec-form' onSubmit={handleSubmit}>
            <div><input
              type="text"
              name="cardNumber"
              className='cn'
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            /></div>
            <div className='aa'><input
              type="text"
              name="expirationDate"
              className='exp'
              placeholder="Expiry (MM/YY)"
              value={formData.expirationDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cvv"
              className='cvv'
              placeholder="CVV"
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
              value={formData.holdername}
              onChange={handleInputChange}
              required
            />
            </div>
          </form>
          </div>
          {/* <button type="button" onClick={handlePreviousStep}>
              Previous
            </button> */}
            <button type="submit">Pay Now</button>
        </div>
        <div className={`step ${step === 3 ? 'active' : ''}`}>
          <h2>Step 3: Order Confirmation</h2>
          <p>Thank you for your order! Your payment was successful.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulation;
