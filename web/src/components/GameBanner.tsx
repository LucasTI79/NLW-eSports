import React, { AnchorHTMLAttributes, HTMLAttributeAnchorTarget } from 'react';

interface GameBannerProps extends AnchorHTMLAttributes<HTMLAttributeAnchorTarget> {
  bannerUrl: string;
  title: string;
  adsCount: number
}

export function GameBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <a href="" className='keen-slider__slide relative rounded-lg overflow-hidden min-w-[188px] min-h-[250px]'>
      <img src={bannerUrl} alt="" className='object-cover' />
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{title}</strong>
        <span className='text-zinc-300 text-sm block'>{adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}