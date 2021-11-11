import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class CategoriaProducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCategoria: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionCategoria: string;

  @hasMany(() => Producto)
  categoriaProducto: Producto[];

  constructor(data?: Partial<CategoriaProducto>) {
    super(data);
  }
}

export interface CategoriaProductoRelations {
  // describe navigational properties here
}

export type CategoriaProductoWithRelations = CategoriaProducto & CategoriaProductoRelations;
