import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  MetodoPago,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoMetodoPagoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'MetodoPago belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MetodoPago)},
          },
        },
      },
    },
  })
  async getMetodoPago(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<MetodoPago> {
    return this.productoRepository.productoMetodopago(id);
  }
}
