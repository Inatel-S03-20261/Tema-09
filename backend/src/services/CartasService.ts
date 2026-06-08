import { ICartaConhecidaRepository } from "../repositories/ICartaConhecidaRepository";
import { CartaConhecida } from "../models/CartaConhecida";

export class CartasService {
  private cartaConhecidaRepository: ICartaConhecidaRepository;

  constructor(cartaConhecidaRepository: ICartaConhecidaRepository) {
    this.cartaConhecidaRepository = cartaConhecidaRepository;
  }

  public listarCartasConhecidas(jogadorId: number): Promise<CartaConhecida[]> {
    return this.cartaConhecidaRepository.listarPorJogador(jogadorId);
  }

  public registrarCartaRecebida(jogadorId: number, pokemonId: number): void {
    
  }

  public registrarCartaTrocada(jogadorId: number, pokemonId: number): void {
    
  }

  public filtrarCartas(filtro: string, cartasConhecidas: CartaConhecida[]): void {
    
  }
}