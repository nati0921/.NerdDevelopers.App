import {Entity, model, property} from '@loopback/repository';

@model()
export class MetodoPago extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<MetodoPago>) {
    super(data);
  }
}

export interface MetodoPagoRelations {
  // describe navigational properties here
}

export type MetodoPagoWithRelations = MetodoPago & MetodoPagoRelations;
