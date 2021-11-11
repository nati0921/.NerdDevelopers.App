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
import {CategoriaProducto} from '../models';
import {CategoriaProductoRepository} from '../repositories';

export class CategoriaProductoController {
  constructor(
    @repository(CategoriaProductoRepository)
    public categoriaProductoRepository : CategoriaProductoRepository,
  ) {}

  @post('/categoria-productos')
  @response(200, {
    description: 'CategoriaProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriaProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaProducto, {
            title: 'NewCategoriaProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    categoriaProducto: Omit<CategoriaProducto, 'id'>,
  ): Promise<CategoriaProducto> {
    return this.categoriaProductoRepository.create(categoriaProducto);
  }

  @get('/categoria-productos/count')
  @response(200, {
    description: 'CategoriaProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CategoriaProducto) where?: Where<CategoriaProducto>,
  ): Promise<Count> {
    return this.categoriaProductoRepository.count(where);
  }

  @get('/categoria-productos')
  @response(200, {
    description: 'Array of CategoriaProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriaProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CategoriaProducto) filter?: Filter<CategoriaProducto>,
  ): Promise<CategoriaProducto[]> {
    return this.categoriaProductoRepository.find(filter);
  }

  @patch('/categoria-productos')
  @response(200, {
    description: 'CategoriaProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaProducto, {partial: true}),
        },
      },
    })
    categoriaProducto: CategoriaProducto,
    @param.where(CategoriaProducto) where?: Where<CategoriaProducto>,
  ): Promise<Count> {
    return this.categoriaProductoRepository.updateAll(categoriaProducto, where);
  }

  @get('/categoria-productos/{id}')
  @response(200, {
    description: 'CategoriaProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriaProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CategoriaProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriaProducto>
  ): Promise<CategoriaProducto> {
    return this.categoriaProductoRepository.findById(id, filter);
  }

  @patch('/categoria-productos/{id}')
  @response(204, {
    description: 'CategoriaProducto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaProducto, {partial: true}),
        },
      },
    })
    categoriaProducto: CategoriaProducto,
  ): Promise<void> {
    await this.categoriaProductoRepository.updateById(id, categoriaProducto);
  }

  @put('/categoria-productos/{id}')
  @response(204, {
    description: 'CategoriaProducto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoriaProducto: CategoriaProducto,
  ): Promise<void> {
    await this.categoriaProductoRepository.replaceById(id, categoriaProducto);
  }

  @del('/categoria-productos/{id}')
  @response(204, {
    description: 'CategoriaProducto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriaProductoRepository.deleteById(id);
  }
}
