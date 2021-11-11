import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {MetodoPago, MetodoPagoRelations} from '../models';

export class MetodoPagoRepository extends DefaultCrudRepository<
  MetodoPago,
  typeof MetodoPago.prototype.id,
  MetodoPagoRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(MetodoPago, dataSource);
  }
}
