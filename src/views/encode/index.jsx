import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { Input, Alert } from 'antd'
import './style.less'

const encodePage = () => {
  const [hexSet, setHexSet] = useState({ bin: '', oct: '', dec: '', hex: '' })
  const [hexInfo, setHexInfo] = useState({
    text: '输入数字，自动转化成其他进制',
    type: 'info'
  })

  const hexConvert = ({ target: { value } }, key) => {
    let tempSet = {
      ...hexSet
    }
    if (!value) {
      setHexSet({ bin: '', oct: '', dec: '', hex: '' })
      return
    }
    switch (key) {
      case 'bin':
        if (!/^[01]*$/i.test(value)) {
          setHexInfo({
            ...hexInfo,
            ...{
              text: '请输入 0 到 1 范围内的数字',
              type: 'error'
            }
          })
          return
        }
        tempSet = {
          oct: parseInt(value, 2).toString(8),
          dec: parseInt(value, 2),
          hex: parseInt(value, 2).toString(16)
        }
        break
      case 'oct':
        if (!/^[0-7]*$/i.test(value)) {
          setHexInfo({
            ...hexInfo,
            ...{
              text: '请输入 0 到 7 范围内的数字',
              type: 'error'
            }
          })
          return
        }
        tempSet = {
          bin: parseInt(value, 8).toString(2),
          dec: parseInt(value, 8),
          hex: parseInt(value, 8).toString(16)
        }

        break

      case 'dec':
        if (!/^[0-9]*$/i.test(value)) {
          setHexInfo({
            ...hexInfo,
            ...{
              text: '请输入 0 到 9 范围内的数字',
              type: 'error'
            }
          })
          return
        }
        tempSet = {
          bin: parseInt(value, 10).toString(2),
          oct: parseInt(value, 10).toString(8),
          hex: parseInt(value, 10).toString(16)
        }

        break

      case 'hex':
        if (!/^[0-9a-f]*$/i.test(value)) {
          setHexInfo({
            ...hexInfo,
            ...{
              text: '请输入数字及 A 到 F 范围内的字母',
              type: 'error'
            }
          })
          return
        }
        tempSet = {
          bin: parseInt(value, 16).toString(2),
          oct: parseInt(value, 16).toString(8),
          dec: parseInt(value, 16)
        }

        break

      default:
        break
    }
    setHexInfo({
      ...hexInfo,
      ...{
        text: '输入数字，自动转化成其他进制',
        type: 'info'
      }
    })
    tempSet[key] = value
    setHexSet(tempSet)
  }
  const HexConversion = (
    <div className="hexConv">
      <h2>进制转换</h2>
      <Alert className="hexAlert" message={hexInfo.text} type={hexInfo.type} />
      <div className="inputList">
        {[
          {
            zh: '二进制',
            key: 'bin',
            pattern: '[0-1]+',
            placeholder: '1010'
          },
          {
            zh: '八进制',
            key: 'oct',
            pattern: '[0-7]+',
            placeholder: '12'
          },
          {
            zh: '十进制',
            key: 'dec',
            pattern: '[0-9]+',
            placeholder: '18'
          },
          {
            zh: '十六进制',
            key: 'hex',
            pattern: '[0-9A-Fa-f]+',
            placeholder: 'A'
          }
        ].map(x => (
          <div className="item" key={x.key}>
            <div className="title">{x.zh}</div>
            <Input
              type="text"
              id={'type_' + x.key}
              pattern={x.pattern}
              placeholder={x.placeholder}
              value={hexSet[x.key]}
              onChange={e => hexConvert(e, x.key)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  // value={this.state.val1} //           onChange={e => this.handleChange1(e)}

  return <div className="encodePage">{HexConversion}</div>
}

export default encodePage