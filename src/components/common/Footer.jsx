const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const Footer = () => {
  const logos = [
    { src: 'images/logos/clausthal-logo.png', alt: 'TU Clausthal', url: 'https://www.tu-clausthal.de', className: 'h-16' },
    { src: 'images/logos/UBB_white.png', alt: 'Babeș-Bolyai University', url: 'https://www.ubbcluj.ro', className: 'h-24' },
    { src: 'images/logos/rostock-logo.png', alt: 'University of Rostock', url: 'https://www.uni-rostock.de', className: 'h-20' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          {/* Partner Logos */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Partner Institutions</h3>
            <div className="flex flex-wrap items-center gap-6">
              {logos.map((logo, index) => (
                <a
                  key={index}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={getAssetUrl(logo.src)}
                    alt={logo.alt}
                    className={`${logo.className} w-auto object-contain`}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright and Info */}
          <div className="md:col-span-1 md:text-right">
            <h3 className="text-2xl font-heading font-bold mb-2">CORE</h3>
            <p className="text-gray-400 mb-4">
              Cognitive Robotics in Europe
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CORE Initiative. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            Advancing cognitive robotics research through European collaboration
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
