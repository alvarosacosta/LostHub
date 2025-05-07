function sanitizeFilename(name: string): string {
    return name
      .normalize('NFD')                    // separa acentos
      .replace(/[\u0300-\u036f]/g, '')     // elimina acentos
      .replace(/[^\w.-]+/g, '-')           // reemplaza caracteres no alfanuméricos por guiones
      .replace(/--+/g, '-')                // evita múltiples guiones seguidos
      .toLowerCase();
  }

export function generateUniqueFilePath(principalFolder: string | undefined, text1: string, text2: string, fileName: string) {

  if(!principalFolder){
    return 'error'
  }
  
  const cleanText1 = sanitizeFilename(text1);
  const cleanText2 = sanitizeFilename(text2);
  const cleanFileName = sanitizeFilename(fileName);
  
  return `${principalFolder}/${cleanText1}_${cleanText2}/${cleanFileName}_${Date.now()}`;
}