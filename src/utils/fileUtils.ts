function sanitizeFilename(name: string): string {
    return name
      .normalize('NFD')                    // separa acentos
      .replace(/[\u0300-\u036f]/g, '')     // elimina acentos
      .replace(/[^\w.-]+/g, '-')           // reemplaza caracteres no alfanuméricos por guiones
      .replace(/--+/g, '-')                // evita múltiples guiones seguidos
      .toLowerCase();
  }

export function generateUniqueFilePath(userId: string, itemName: string, type: string, fileName: string) {
    const cleanItemName = sanitizeFilename(itemName);
    const cleanFileName = sanitizeFilename(fileName);
    return `${userId}/${cleanItemName}_${type}_${Date.now()}/${cleanFileName}`;
}