import { MagnifyingGlassPlus } from 'phosphor-react'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export default function CreateAdBanner() {
  return (
    <div className='pt-1 bg-nlw-gradient self-center rounded-lg overflow-hidden mt-8 w-[90vw]'>
        <div className='bg-[#262634] px-8 py-6 flex gap-4 flex-col md:flex-row justify-between lg:items-center'>
        
        <div className='flex flex-col gap-1 mb-4'>
        <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
        <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
          <MagnifyingGlassPlus size={24}/>
          Publicar anúncio
        </Dialog.Trigger>

        </div>
    </div>
  )
}
