import React from 'react'
import './style.less'

let output = (len, start) => {
  return new Array(len)
    .fill(1)
    .map((x, i) => String.fromCodePoint(start + i))
    .join(' ')
}

const About = () => (
  <div className="container">
    <div className="symbol">
      <h1>太玄经</h1>
      <h1>{output(87, 0x1d300)}</h1>
      <hr />
      <h1>爻</h1>
      <h1>{output(64, 0x4dc0)}</h1>
      <hr />
      <h1>扑克</h1>
      <h1>{output(82, 0x1f0a0)}</h1>
      <hr />
      <h1>domino</h1>
      <h1>{output(100, 0x1f030)}</h1>
      <h1>麻将</h1>
      <h1>{output(44, 0x1f000)}</h1>
    </div>
    {/* <p>Did you get here via Redux?</p> */}
  </div>
)

export default About