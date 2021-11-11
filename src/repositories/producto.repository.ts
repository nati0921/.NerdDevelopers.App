import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Producto, ProductoRelations, Carrito, MetodoPago} from '../models';
import {CarritoRepository} from './carrito.repository';
import {MetodoPagoRepository} from './metodo-pago.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly productoCarrito: HasManyRepositoryFactory<Carrito, typeof Producto.prototype.id>;

  public readonly productoMetodopago: BelongsToAccessor<MetodoPago, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('CarritoRepository') protected carritoRepositoryGetter: Getter<CarritoRepository>, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>,
  ) {
    super(Producto, dataSource);
    this.productoMetodopago = this.createBelongsToAccessorFor('productoMetodopago', metodoPagoRepositoryGetter,);
    this.registerInclusionResolver('productoMetodopago', this.productoMetodopago.inclusionResolver);
    this.productoCarrito = this.createHasManyRepositoryFactoryFor('productoCarrito', carritoRepositoryGetter,);
    this.registerInclusionResolver('productoCarrito', this.productoCarrito.inclusionResolver);
  }
}
