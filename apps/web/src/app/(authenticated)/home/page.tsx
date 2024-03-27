'use client'
import { SpotlightPreview } from './components/Hero-parallax'
import { InfiniteMovingCards } from './components/Hero-bento'
import Footer from './components/Footer'

const testimonials = [
  {
    quote:
      ' It stands out as a unique application, promoting community engagement and collaborative activities, encompassing both problem-solving and problem creation',
    name: 'ByteRoot',
    title: 'A coding application',
  },
  {
    quote:
      "Byteroot is an application inspired by the concept of the vegetable beetroot, where each individual's contributions contribute to the growth of the community. It stands out as a unique platform, promoting community engagement and collaborative activities in problem-solving and algorithm creation. The platform ensures the validity of posted questions through a stringent validation process, offering users a reliable space to code, problem-solve, and access solutions.",
    name: 'ByteRoot',
    title: 'A coding application',
  },
  {
    quote:
      'Institutions can use the application for conducting discussions, giving assignments to students, and providing an arena for student group assignments/projects and group discussion centers. We plan to implement topic-based segregation of problems to enhance user experience and facilitate better problem-solving.',
    name: 'ByteRoot',
    title: 'A coding application',
  },
  {
    quote:
      'It aims to create a collaborative environment for coders worldwide, where they can share knowledge, solve coding challenges, and engage in discussions, fostering a sense of community and mutual support. By offering a platform for problem-solving, code creation, and discussion, Byteroots encourages innovation and creativity among its users. It serves as a space where new ideas can be explored, tested, and refined, leading to the development of innovative solutions and projects.',
    name: 'ByteRoot',
    title: 'A coding application',
  },
  {
    quote:
      'Byteroots aims to create a collaborative environment for coders worldwide, where they can come together to share knowledge, solve coding challenges, and engage in discussions, fostering a sense of community and mutual support.By offering a platform for problem-solving, code creation, and discussion, Byteroots encourages innovation and creativity among its users. It serves as a space where new ideas can be explored, tested, and refined, leading to the development of innovative solutions and projects.',
    name: 'ByteRoot',
    title: 'A coding application',
  },
]

export default function HomePage() {
  return (
    <div className="h-full">
      <SpotlightPreview />
      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-black bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <Footer />
    </div>
  )
}
