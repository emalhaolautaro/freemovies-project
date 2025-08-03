// Utilidad para búsqueda difusa y sugerencias

// Función para calcular la distancia de Levenshtein (similitud entre strings)
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  // Crear matriz
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  // Llenar matriz
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitución
          matrix[i][j - 1] + 1, // inserción
          matrix[i - 1][j] + 1, // eliminación
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

// Función para calcular similitud (0-1, donde 1 es idéntico)
function similarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const distance = levenshteinDistance(longer, shorter)
  return (longer.length - distance) / longer.length
}

// Función para normalizar strings (quitar acentos, espacios extra, etc.)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^\w\s]/g, "") // Quitar puntuación
    .replace(/\s+/g, " ") // Normalizar espacios
    .trim()
}

// Función principal para encontrar sugerencias
export function findSuggestion(query: string, titles: string[], threshold = 0.4): string | null {
  const normalizedQuery = normalizeString(query)

  if (normalizedQuery.length < 2) return null

  let bestMatch = ""
  let bestScore = 0

  titles.forEach((title) => {
    const normalizedTitle = normalizeString(title)

    // Calcular similitud
    const score = similarity(normalizedQuery, normalizedTitle)

    // También verificar si la query está contenida en el título
    const containsScore = normalizedTitle.includes(normalizedQuery) ? 0.8 : 0

    // También verificar similitud de palabras individuales
    const queryWords = normalizedQuery.split(" ")
    const titleWords = normalizedTitle.split(" ")

    let wordScore = 0
    queryWords.forEach((queryWord) => {
      titleWords.forEach((titleWord) => {
        const wordSim = similarity(queryWord, titleWord)
        if (wordSim > wordScore) wordScore = wordSim
      })
    })

    const finalScore = Math.max(score, containsScore, wordScore * 0.7)

    if (finalScore > bestScore && finalScore >= threshold) {
      bestScore = finalScore
      bestMatch = title
    }
  })

  return bestMatch || null
}

// Función para verificar si una búsqueda es muy similar a un título existente
export function shouldShowSuggestion(query: string, titles: string[]): boolean {
  const suggestion = findSuggestion(query, titles, 0.3)
  return suggestion !== null && normalizeString(suggestion) !== normalizeString(query)
}
