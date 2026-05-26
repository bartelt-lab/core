const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const Footer = () => {
  const logos = [
    { src: 'logos/clausthal-logo.png', alt: 'TU Clausthal', url: 'https://www.tu-clausthal.de', className: 'h-16' },
    { src: 'logos/ubb-logo.png', alt: 'Babeș-Bolyai University', url: 'https://www.ubbcluj.ro', className: 'h-20' },
    { src: 'logos/rostock-logo.png', alt: 'University of Rostock', url: 'https://www.uni-rostock.de', className: 'h-20' },
  ]

  return (
    <footer className="border-t border-gray-200 bg-white py-12 text-gray-950">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4">
          <div className="md:col-span-3">
            <h3 className="mb-4 text-lg font-semibold">Partner Institutions</h3>
            <div className="flex flex-wrap items-center gap-4">
              {logos.map((logo) => (
                <a
                  key={logo.src}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-24 min-w-48 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 transition hover:border-blue-200 hover:bg-white hover:shadow-md"
                >
                  <img
                    src={getAssetUrl(logo.src)}
                    alt={logo.alt}
                    className={`${logo.className} w-auto object-contain opacity-85 grayscale transition hover:opacity-100 hover:grayscale-0`}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 md:text-right">
            <h3 className="mb-2 text-2xl font-heading font-bold">CORE</h3>
            <p className="mb-4 text-gray-600">Cognitive Robotics in Europe</p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CORE Initiative. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>Advancing cognitive robotics research through European collaboration</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
