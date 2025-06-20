import { despesa } from "./despesa.model";

export type DespesasDto = {
  status: number;
  data: despesa[ ],
  erros: [
    {
      nome: string,
      mensagem: string
    }
  ]
}