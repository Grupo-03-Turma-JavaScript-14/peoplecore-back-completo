export class UsuarioLogin {
    id?: number;
    nome?: string;
    usuario!: string;
    senha?: string;
    foto?: string;
    role?: string;  // ← ADICIONAR ESTA LINHA
    token?: string;
}