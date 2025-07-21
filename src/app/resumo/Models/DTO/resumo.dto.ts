import { resumo } from "../resumo.model";

export type ResumoDto = {
  status: number;
  data: resumo,
  erros: [
    {
      nome: string,
      mensagem: string
    }
  ]
}