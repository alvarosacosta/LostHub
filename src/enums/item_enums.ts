export enum ItemType {
    Encontrado = 'Encontrado',
    Perdido = 'Perdido'
}

export enum PublicTransports {
    Autobús = 'Autobús',
    Metro = 'Metro',
    Tranvía = 'Tranvía',
    Tren = 'Tren',
    Ferry = 'Ferry',
    Taxi = 'Taxi',
    Teleférico = 'Teleférico',
}

export enum Gender {
    Macho = 'Macho',
    Hembra = 'Hembra'
}

export enum Category {
    Animal = 'Animal',
    Electrónica = 'Electrónica',
    Documentación = 'Documentación',
    Ropa = 'Ropa',
    Accesorios = 'Accesorios',
    Llaves = 'Llaves',
    Dinero = 'Dinero',
    Juguetes = 'Juguetes',
    Herramientas = 'Herramientas',
    Transporte = 'Transporte',
    Otro = 'Otro',

}

export enum Subcategory {
    // Animal
    Perro = 'Perro',
    Gato = 'Gato',
    Pájaro = 'Pájaro',
    Conejo = 'Conejo',

    // Electrónica
    Móvil = 'Móvil',
    Portátil = 'Portátil',
    Tablet = 'Tablet',
    Auriculares = 'Auriculares',

    // Documentación
    DNI = 'DNI',
    Pasaporte = 'Pasaporte',
    CarnetConducir = 'Carnet de Conducir',
    TarjetaCredito = 'Tarjeta de Crédito',

    // Ropa
    Chaqueta = 'Chaqueta',
    Camiseta = 'Camiseta',
    Bufanda = 'Bufanda',
    Zapatos = 'Zapatos',

    // Accesorios
    Gafas = 'Gafas',
    Mochila = 'Mochila',
    Bolso = 'Bolso',
    Paraguas = 'Paraguas',

    // Llaves
    LlavesCasa = 'Llaves de Casa',
    LlavesCoche = 'Llaves de Coche',

    // Dinero
    Monedero = 'Monedero',
    Cartera = 'Cartera',
    Billete = 'Billete',

    // Juguetes
    Muñeco = 'Muñeco',
    Peluche = 'Peluche',
    CocheJuguete = 'Coche de Juguete',

    // Herramientas
    Taladro = 'Taladro',
    Destornillador = 'Destornillador',

    // Transporte
    Patinete = 'Patinete',
    Bicicleta = 'Bicicleta',

    // Otro
    Otro = 'Otro',
}

export enum Brand {
    // Ropa
    Nike = "Nike",
    Adidas = "Adidas",
    Zara = "Zara",
    HM = "H&M",

    // Tecnología
    Apple = "Apple",
    Samsung = "Samsung",
    Sony = "Sony",
    Xiaomi = "Xiaomi",

    // Automóviles
    Toyota = "Toyota",
    BMW = "BMW",
    Tesla = "Tesla",
    Mercedes = "Mercedes",

    // Cosmética
    Loreal = "L'Oréal",
    Nivea = "Nivea",
    Sephora = "Sephora",
    Maybelline = "Maybelline",

    // Alimentación
    CocaCola = "Coca-Cola",
    Pepsi = "Pepsi",
    Nestle = "Nestlé",
    Danone = "Danone",

    // Otro
    Otra = "Otra"
}


export enum Color {
    Rojo = 'Rojo',
    Azul = 'Azul',
    Verde = 'Verde',
    Amarillo = 'Amarillo',
    Naranja = 'Naranja',
    Negro = 'Negro',
    Blanco = 'Blanco',
    Gris = 'Gris',
    Marrón = 'Marrón',
    Rosa = 'Rosa',
    Beige = 'Beige',
    Plata = 'Plata',
}

export const categoryToSubcategories: Record<Category, Subcategory[]> = {
    [Category.Animal]: [
        Subcategory.Perro,
        Subcategory.Gato,
        Subcategory.Pájaro,
        Subcategory.Conejo,
    ],
    [Category.Electrónica]: [
        Subcategory.Móvil,
        Subcategory.Portátil,
        Subcategory.Tablet,
        Subcategory.Auriculares,
    ],
    [Category.Documentación]: [
        Subcategory.DNI,
        Subcategory.Pasaporte,
        Subcategory.CarnetConducir,
        Subcategory.TarjetaCredito,
    ],
    [Category.Ropa]: [
        Subcategory.Chaqueta,
        Subcategory.Camiseta,
        Subcategory.Bufanda,
        Subcategory.Zapatos,
    ],
    [Category.Accesorios]: [
        Subcategory.Gafas,
        Subcategory.Mochila,
        Subcategory.Bolso,
        Subcategory.Paraguas,
    ],
    [Category.Llaves]: [
        Subcategory.LlavesCasa,
        Subcategory.LlavesCoche,
    ],
    [Category.Dinero]: [
        Subcategory.Monedero,
        Subcategory.Cartera,
        Subcategory.Billete,
    ],
    [Category.Juguetes]: [
        Subcategory.Muñeco,
        Subcategory.Peluche,
        Subcategory.CocheJuguete,
    ],
    [Category.Herramientas]: [
        Subcategory.Taladro,
        Subcategory.Destornillador,
    ],
    [Category.Transporte]: [
        Subcategory.Patinete,
        Subcategory.Bicicleta,
    ],
    [Category.Otro]: [
        Subcategory.Otro,
    ],
};