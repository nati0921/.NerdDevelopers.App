import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {CategoriaProducto, CategoriaProductoRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class CategoriaProductoRepository extends DefaultCrudRepository<
  CategoriaProducto,
  typeof CategoriaProducto.prototype.id,
  CategoriaProductoRelations
> {

  public readonly categoriaProducto: HasManyRepositoryFactory<Producto, typeof CategoriaProducto.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(CategoriaProducto, dataSource);
    this.categoriaProducto = this.createHasManyRepositoryFactoryFor('categoriaProducto', productoRepositoryGetter,);
    this.registerInclusionResolver('categoriaProducto', this.categoriaProducto.inclusionResolver);
  }
}
