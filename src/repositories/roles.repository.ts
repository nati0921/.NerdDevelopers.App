import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Roles, RolesRelations, Permisos} from '../models';
import {PermisosRepository} from './permisos.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly rolesPermisos: HasManyRepositoryFactory<Permisos, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PermisosRepository') protected permisosRepositoryGetter: Getter<PermisosRepository>,
  ) {
    super(Roles, dataSource);
    this.rolesPermisos = this.createHasManyRepositoryFactoryFor('rolesPermisos', permisosRepositoryGetter,);
    this.registerInclusionResolver('rolesPermisos', this.rolesPermisos.inclusionResolver);
  }
}
