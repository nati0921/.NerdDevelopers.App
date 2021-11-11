import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Roles} from '../models';
import {RolesRepository} from './roles.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly usuarioRoles: BelongsToAccessor<Roles, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Usuario, dataSource);
    this.usuarioRoles = this.createBelongsToAccessorFor('usuarioRoles', rolesRepositoryGetter,);
    this.registerInclusionResolver('usuarioRoles', this.usuarioRoles.inclusionResolver);
  }
}
