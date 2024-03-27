import { Spotlight } from './Hero'

export function SpotlightPreview() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-8 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-green-100 to-neutral-400 bg-opacity-50">
          Your Coding <br /> and Challenge Arena.
        </h1>
        <p className="mt-8 font-normal text-xl text-green-200 max-w-2xl text-center mx-auto">
          It stands out as a unique application, promoting community engagement
          and collaborative activities, encompassing both problem-solving and
          problem creation.
        </p>
      </div>
    </div>
  )
}
