import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        paddingTop: '20px',
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
      className="mt-14 mb-0 h-20"
    >
      <p className="text-white text-l">
        <Link href="mailto:developercode.assistance@gmail.com">
          byteroot.assistance@gmail.com
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
