import { useState, useEffect } from 'react';
import axios from 'axios'
import './styles/main.css'
import imgLogo from './assets/logo.svg'

import { GameBanner } from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModel } from './components/CreateAdModel';

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Carrossel from './components/Carrosel';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
        setLoading(true);
      })
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img src={imgLogo} className="mx-4"/>

      <h1 className='text-5xl md:text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span> está aqui</h1>

        <Carrossel games={games}/>
        
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModel />
      </Dialog.Root>
      
    </div>
  )
}

export default App
