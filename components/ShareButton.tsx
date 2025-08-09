'use client'
import React, { useState, useEffect } from "react"
import { Globe, X } from "lucide-react"

export default function ShareButton() {
  const [showModal, setShowModal] = useState(false)
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
    } else {
      const textArea = document.createElement("textarea")
      textArea.value = url
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand("copy")
      textArea.remove()
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full border border-gray-800 transition-colors"
        aria-label="Compartir enlace"
      >
        <Globe className="h-4 w-4 text-gray-300" />
        <span className="text-sm font-medium">Compartir</span>
      </button>

      {showModal && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 rounded-lg shadow-lg max-w-sm w-full p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-white text-lg font-semibold mb-4">Compartir enlace</h3>

              <p className="break-words text-gray-300 mb-4 select-all">{url}</p>

              {copied && (
                <p className="text-green-400 mb-4 font-medium select-none">
                  Enlace copiado al portapapeles
                </p>
              )}

              <button
                onClick={copyToClipboard}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition-colors"
              >
                Copiar enlace
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
