import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Producto extends Entity {
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
  nombreProducto: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionProducto: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  existencia: number;

  @property({
    type: 'string',
    required: true,
  })
  idCategoria: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;