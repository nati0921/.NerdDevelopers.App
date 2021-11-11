import {Entity, model, property, hasMany} from '@loopback/repository';
import {Permisos} from './permisos.model';

@model()
export class Roles extends Entity {
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
  idUsusario: string;

  @property({
    type: 'string',
    required: true,
  })
  idPermiso: string;

  @hasMany(() => Permisos)
  rolesPermisos: Permisos[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
