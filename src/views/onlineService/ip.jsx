// https://reqbin.com/lib/ipInfo-api/yel1uw4m/ip-geolocation-api-example
// https://devpal.co/
import React, { useEffect, useState } from 'react'
import { getCountry } from './country'
import { Spin } from 'antd'

const transformLonlatToDD = coordinate => {
  const d = Math.floor(coordinate) //116.512885 转换成度（°）实则是取整
  const m = Math.floor((coordinate % 1) * 60) //0.512885 转换成分(') 实则是0.512885 * 60 后取整。
  const s = ((((coordinate % 1) * 60) % 1) * 60).toFixed(1)
  // const s = Math.floor(coordinate % 1 * 60 % 1 * 60); //0.512885 转换成秒('') 实则是m 值的小数值 * 60后取整。
  // const ms = coordinate % 1 * 60 % 1 * 60 % 1 * 1000; //0.512885 秒（''）值后面如有小数值不能丢舍。
  return `${d}°${m}'${s}"`
}

const convertLoc = (lat, lon) => {
  const latstr = transformLonlatToDD(lat) + (lat > 0 ? 'N' : 'S')
  const lonstr = transformLonlatToDD(lon) + (lon > 0 ? 'E' : 'W')
  return latstr + ' ' + lonstr
}

const getMap = loc => {
  const locArr = loc.split(',')
  const [lat, lon] = locArr.map(x => x * 1)
  const [x, y] = [7, 6]
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon -
    x}%2C${lat - y}%2C${lon + x}%2C${lat +
    y}&layer=mapnik&marker=${lat}%2C${lon}`

  const b64 = btoa(unescape(encodeURIComponent(convertLoc(lat, lon))))
  return (
    <div className="flex start">
      <iframe
        width="500"
        height="350"
        frameBorder="0"
        title="loc map"
        src={iframeSrc}></iframe>
      <iframe
        src={`
      https://www.google.com/maps/embed?pb=
      !1m10
        !1m4
          !1m3
            !1d5000000
            !2d${lon}
            !3d${lat}
        !3m3
          !1m2
            !1s0x0%3A0x0
            !2z${b64}
        !5e0`.replace(/[\r \t\n]+/g, '')}
        width="500"
        height="350"
        allowFullScreen=""
        title="GoogleMap"
        loading="lazy"></iframe>
    </div>
  )
  // https://www.google.com/maps/@30.4796148,120.5383719,6384234m/data=!3m1!1e3!4m2!7m1!2e1?hl=zh-CN

  // https://www.google.com/maps/@32.9998961,138.4293071,5z/data=!4m2!7m1!2e1
  // <iframe src="https://www.google.com/maps/embed?pb=
  // !1m14
  // !1m12
  // !1m3
  // !1d13705818.681931842!2d138.42930715!3d32.999896050000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-CN!2sjp!4v1620183206669!5m2!1szh-CN!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
}
const Page = () => {
  const [text, setText] = useState({})
  const [countryObj, setCountryObj] = useState({})
  const [mapIframe, setMapIframe] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const url = 'https://respok.com/ipinfo_io/default'
    fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(r => {
        if (r) {
          const { country, loc } = r
          setText(r)
          if (loc) {
            const mapIframe = getMap(loc)
            setMapIframe(mapIframe)
          }
          if (country) {
            const countryObj = getCountry(country)
            setCountryObj(countryObj)
          }
        }
      })
      .catch(err => console.error(new Error(err)))
      .finally(f => setLoading(false))
  }, [])
  return (
    <div className="p20">
      {/* <div className="flex">
      <Input
        className="m15"
        placeholder="输入 IP 地址"
        value={this.state.idcvalue}
        onChange={this.handleChange}
      />
      <Button type="primary">查询</Button>
    </div> */}

      <Spin spinning={loading} size="large">
        <ul>
          <li>IP: {text.ip || ''}</li>
          <li>
            地址：
            {`${countryObj.emoji || ''} ${countryObj.zh ||
              ''} ${countryObj.name || ''}`}
          </li>
          <li>区域: {`${text.region || ''} ${text.city || ''}`}</li>
          <li>组织: {text.org}</li>
          <li>邮编: {text.postal || ''}</li>
          <li>坐标: {text.loc || ''}</li>
          <li>时区: {text.timezone || ''}</li>
        </ul>
        {mapIframe}
      </Spin>
    </div>
  )
}

export default Page

// https://respok.com/ipinfo_io/

// https://respok.com/ipinfo_io/default
