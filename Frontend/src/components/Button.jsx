import React from 'react'

const Button = ({className, text, isLeftImg, isRightImg, img, onClick}) => {
  return (
    <button onClick={onClick} className={`${className}`}>{isLeftImg && img }{text}{isRightImg && img }</button>
  )
}

export default Button