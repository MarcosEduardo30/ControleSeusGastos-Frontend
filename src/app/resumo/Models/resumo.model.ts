export type resumo = {
    totalGastoMes: number,
    totalGastoAno: number,
    gastosPorMes: GastoPorMes[],
    gastosPorCategoria: GastoPorCategoria[]
}

type GastoPorMes = {
    mes: string,
    valor: number
}

type GastoPorCategoria = {
    categoria: string,
    valor: number
}