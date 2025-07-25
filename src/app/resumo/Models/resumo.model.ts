export type resumo = {
    totalGastoMes: number,
    totalGastoAno: number,
    gastosPorMes: GastoPorMes[]
}

type GastoPorMes = {
    mes: string,
    valor: number
}