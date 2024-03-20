import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer
      style={{ textAlign: 'center', paddingTop: '20px' }}
      className="mt-14 mb-0"
    >
      <p className="text-white text-l">
        <Link href="learninglabs.assistance@gmail.com">
          developercode.assistance@gmail.com
        </Link>
      </p>
      <p className="text-slate-white text-l">
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </p>
    </footer>
  )
}

export default Footer
