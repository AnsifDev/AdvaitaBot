

export default function Loading() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
        <div className="min-w-72 md:min-w-96 px-4 py-3 gap-2 md:gap-3 flex flex-col rounded-xl bg-white/10 animate-pulse">
            <div className='text-center font-bold text-xl md:text-3xl mt-4 mb-2'>Select Quote</div>
            <div className="flex flex-col gap-1">
                <div className='text-xs text-neutral-300'>Select Chapter</div>
                <div className='bg-neutral-700 py-1.5 rounded-md min-w-48 text-center text-sm text-neutral-400 my-auto'>Loading Chapters...</div>
            </div>
            <div className="flex flex-col gap-1">
                <div className='text-xs text-neutral-300'>Select Verse</div>
                <div className='bg-neutral-700 py-1.5 rounded-md min-w-48 text-center text-sm text-neutral-400 my-auto'>Loading Verses...</div>
            </div>
            <button disabled className="w-min self-end py-2 px-6 my-2 rounded-full bg-white/40 text-neutral-700 font-bold">Continue</button>
        </div>
      </div>
    );
  }