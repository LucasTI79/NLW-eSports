import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react'
import { ArrowCounterClockwise } from 'phosphor-react';
import React, { useEffect, useState } from 'react'
import { GameBanner } from '../GameBanner'
import './styles.css'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

interface Props {
  games: Game[]
}

export default function Carrossel({ games }: Props){
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [itemsPerView, setitemsPerView] = useState(6);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: 'snap',
      slides: {
        origin: 'auto',
        perView: itemsPerView,
        spacing: 0,
        number: games.length
      },
      range: {
        max: games.length
      },
      slideChanged(s) {       
        setCurrentSlide(s.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    }
  )

  useEffect(() => {
    if(document.body.clientWidth > 1000){
      setitemsPerView(6)
    }else if(document.body.clientWidth > 645){
      setitemsPerView(4)
    }else{
      setitemsPerView(2)
    }
  }, [document.body.clientWidth])

  return (
    <>
      <div className="relative">
        <div ref={sliderRef} className="keen-slider grid overflow-hidden grid-cols-6 md:grid-cols-4 sm:grid-cols-2 items-center gap-6 mt-16 max-w-[75vw]">
          {games.map(game => {
            return (
              <GameBanner 
                key={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads} 
                />
            )
          })}
        </div>
        {loaded && instanceRef?.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                Math.ceil(instanceRef.current?.track?.details?.slides?.length / 6) + Math.ceil(instanceRef.current?.track?.details?.slides?.length % 6)
              }
            />
          </>
        )}
      </div>
      {/* {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(Math.ceil(instanceRef.current.track.details.slides.length / 6)).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )} */}
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}