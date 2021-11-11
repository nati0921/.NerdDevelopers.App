import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MetodoPago} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodopagoController {
  constructor(
    @repository(MetodoPagoRepository)
    public metodoPagoRepository : MetodoPagoRepository,
  ) {}

  @post('/metodo-pagos')
  @response(200, {
    description: 'MetodoPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPago',
            exclude: ['id'],
          }),
        },
      },
    })
    metodoPago: Omit<MetodoPago, 'id'>,
  ): Promise<MetodoPago> {
    return this.metodoPagoRepository.create(metodoPago);
  }

  @get('/metodo-pagos/count')
  @response(200, {
    description: 'MetodoPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MetodoPago) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.count(where);
  }

  @get('/metodo-pagos')
  @response(200, {
    description: 'Array of MetodoPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MetodoPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MetodoPago) filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find(filter);
  }

  @patch('/metodo-pagos')
  @response(200, {
    description: 'MetodoPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: MetodoPago,
    @param.where(MetodoPago) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.updateAll(metodoPago, where);
  }

  @get('/metodo-pagos/{id}')
  @response(200, {
    description: 'MetodoPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MetodoPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MetodoPago, {exclude: 'where'}) filter?: FilterExcludingWhere<MetodoPago>
  ): Promise<MetodoPago> {
    return this.metodoPagoRepository.findById(id, filter);
  }

  @patch('/metodo-pagos/{id}')
  @response(204, {
    description: 'MetodoPago PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: MetodoPago,
  ): Promise<void> {
    await this.metodoPagoRepository.updateById(id, metodoPago);
  }

  @put('/metodo-pagos/{id}')
  @response(204, {
    description: 'MetodoPago PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() metodoPago: MetodoPago,
  ): Promise<void> {
    await this.metodoPagoRepository.replaceById(id, metodoPago);
  }

  @del('/metodo-pagos/{id}')
  @response(204, {
    description: 'MetodoPago DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.metodoPagoRepository.deleteById(id);
  }
}
