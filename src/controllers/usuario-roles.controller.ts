import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Roles,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioRolesController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Roles> {
    return this.usuarioRepository.usuarioRoles(id);
  }
}
