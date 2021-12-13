import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [
  {
    id : 'p1',
    price : 6,
    title : "어린 왕자",
    description : "중학교 필독 도서 입니다."
  },
  {
    id : 'p2',
    price : 9,
    title : "동물 농장",
    description : "고등학교 필독 도서 입니다."
  },

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product)=> (
          <ProductItem
            key = {product.id}
            id = {product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
