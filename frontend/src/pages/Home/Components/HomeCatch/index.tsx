import './HomeCatch.css';
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

export const HomeCatch = () => {
  
  const textRef = useRef<HTMLSpanElement>(null);

  const setAnimation = (text: string) => {
    const numText = text.length;
    const selector = '.animation-text';

    gsap.registerPlugin(TextPlugin)
    gsap.to(`${selector}`, {
      duration: numText * 0.03,
      text: {
        value: text,
      },
      ease: 'none',
    })
  }

  useEffect(() => {
    if(textRef.current){
      const node = textRef.current;
      const text = node.innerHTML  //テキストを読み込む
      const height = node.clientHeight  //高さを取得する
      node.innerHTML = ''  //テキストを削除する
      node.style.height = height + 'px'  //高さを設定する
      setAnimation(text)
    }
  },[]);

  return (
    <div className="c-homeCatch">
      <div className="c-homeCatch-warp">
        <div className="c-homeCatch-logo">
          <p className="c-homeCatch-logo-img"><img src="/logo-white.svg" alt="" /></p>
          <p className="c-homeCatch-logo-text">PORTFOLIO</p>
        </div>
        <h2 className="c-homeCatch-heading area-400"><span ref={textRef} id="homeCatch-heading" className="animation-text">DESIGN IS A BRIDGE<br />
        THAT CONNECTS PEOPLE.</span></h2>
      </div>
    </div>
  )
}