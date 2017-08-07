import React from 'react'
import reactLogo from 'Public/react-logo.png'
import Style from '../style.scss'

export default () => (
  <div>
    <h1>Welcome to MERN Start!</h1>
    <div className={Style.reactLogo}>
      <img src={reactLogo} className="img-responsive" alt="react-logo" />
    </div>
  </div>
)
