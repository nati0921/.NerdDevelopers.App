import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CategoriaProducto,
  Producto,
} from '../models';
import {CategoriaProductoRepository} from '../repositories';

export class CategoriaProductoProductoController {
  constructor(
    @repository(CategoriaProductoRepository) protected categoriaProductoRepository: CategoriaProductoRepository,
  ) { }

  @get('/categoria-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of CategoriaProducto has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.categoriaProductoRepository.categoriaProducto(id).find(filter);
  }

  @post('/categoria-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'CategoriaProducto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CategoriaProducto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInCategoriaProducto',
            exclude: ['id'],
            optional: ['categoriaProductoId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.categoriaProductoRepository.categoriaProducto(id).create(producto);
  }

  @patch('/categoria-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'CategoriaProducto.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.categoriaProductoRepository.categoriaProducto(id).patch(producto, where);
  }

  @del('/categoria-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'CategoriaProducto.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.categoriaProductoRepository.categoriaProducto(id).delete(where);
  }
}
