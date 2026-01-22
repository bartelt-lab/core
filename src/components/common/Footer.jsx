const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const Footer = () => {
  const logos = [
    { src: 'images/logos/clausthal-logo.png', alt: 'TU Clausthal', url: 'https://www.tu-clausthal.de' },
    { src: 'images/logos/ubb-logo.png', alt: 'Babeș-Bolyai University', url: 'https://www.ubbcluj.ro' },
    { src: 'images/logos/rostock-logo.png', alt: 'University of Rostock', url: 'https://www.uni-rostock.de' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Partner Logos */}
          <div>
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
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright and Info */}
          <div className="md:text-right">
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
