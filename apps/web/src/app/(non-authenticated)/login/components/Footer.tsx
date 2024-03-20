import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px' }}>
      <p className="text-slate-500 text-l">
        <Link href="learninglabs.assistance@gmail.com">
          developercode.assistance@gmail.com
        </Link>
      </p>
      <p className="text-slate-500 text-l">
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </p>
    </footer>
  )
}

export default Footer
