import React, { useState } from 'react'

import { Radio, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { hsl2hex } from './colors'

const genArr2 = len => Array.from(Array(len + 1), (x, i) => i * 1)

const genHexList = (fn, count) => genArr2(count * 1).map(x => hsl2hex(fn(x)))

const ColorArr = ({ fn, count }) => (
  <div className="cat">
    {genHexList(fn, count).map((x, i) => (
      <CopyToClipboard
        text={x}
        title={x}
        key={i}
        onCopy={() => message.success('颜色已复制！')}>
        <div className="colorItem" style={{ backgroundColor: x }}></div>
      </CopyToClipboard>
    ))}
  </div>
)

const ColorList = ({ count, color: { h, s, l } }) => (
  <div className={'cats count' + count}>
    {[
      x => [(360 / count) * x, s, l],
      x => [h, ((100 / count) * x) / 100, l],
      x => [h, s, ((100 / count) * x) / 100]
    ].map((fn, i) => (
      <ColorArr key={i} fn={fn} count={count} />
    ))}
  </div>
)

const Actiongroup = ({ onChangeFn }) => (
  <div className="showList">
    <div className="action">
      <Radio.Group defaultValue="10" buttonStyle="solid" onChange={onChangeFn}>
        {[10, 15, 20, 30].map((x, i) => (
          <Radio.Button value={x + ''} key={i}>
            {x}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  </div>
)

const ColorListBottom = props => {
  const color = props.val
  const [showCount, setShowCount] = useState(10)
  const onChangeFn = ({ target: { value } }) => setShowCount(value)
  return (
    <div className="colorListBottom">
      <Actiongroup onChangeFn={onChangeFn} />
      <ColorList color={color} count={showCount} />
    </div>
  )
}
export default ColorListBottom
