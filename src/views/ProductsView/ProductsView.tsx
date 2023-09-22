import React from 'react';
import { productsViewStyle } from './productsViewStyle';
import Grid from '@material-ui/core/Grid';
import { MultipleSelect } from '../../components/multipleSelect';
import { SingleSelect } from '../../components/singleSelect ';
import { ProductCard } from '../../components/productCard';
import { SelectItem } from '../../models/SelectItem';
import { useOmangaContex } from '../../context/OmangaContext';
import katana from '../../assets/katana-154939_1280.png';
import buddha from '../../assets/buddha-148533_1280.png';
import book from '../../assets/book-2024278_1280.png';
import board from '../../assets/board-48117_1280.png';
import { Product } from '../../models/Product';




const useStyles = productsViewStyle;

const productsItemsSelect: SelectItem[] = [
  {
    value: 'date',
    slug: 'Plus Récent'
  },
  {
    value: 'risingPrice',
    slug: 'Prix : ordre croissant'
  },
  {
    value: 'decreasingPrice',
    slug: 'Prix : ordre décroissant'
  },
]
const categories = [
  'Statuette',
  'Arme',
  'Livre',
  'Carte',
];

const universe = [
  'Japon1',
  'Japon2',
  'Japon3',
  'Japon4',
];

const products: Product[] = [
  {
    name: 'Statuette',
    price: 150.0,
    imgPath: `${buddha}`,
    category: 'Statuette',
    universe: 'Japon1',
    product_creation_date: 1694295379,
  },
  {
    name: 'Katana',
    price: 1500.0,
    imgPath: `${katana}`,
    category: 'Arme',
    universe: 'Japon2',
    product_creation_date: 1694868179,
  },
  {
    name: 'Omanga Tome 01',
    price: 60.0,
    imgPath: `${book}`,
    category: 'Livre',
    universe: 'Japon3',
    product_creation_date: 1694695379,
  },
  {
    name: 'Carte Omanga',
    price: 80.0,
    imgPath: `${board}`,
    category: 'Carte',
    universe: 'Japon4',
    product_creation_date: 1694795379,
  },
  {
    name: 'Statuette',
    price: 800.0,
    imgPath: `${buddha}`,
    category: 'Statuette',
    universe: 'Japon1',
    product_creation_date: 1694595379,
  },
  {
    name: 'Katana',
    price: 600.0,
    imgPath: `${katana}`,
    category: 'Arme',
    universe: 'Japon2',
    product_creation_date: 1694595379,
  },
  {
    name: 'Omanga Tome 01',
    price: 500.0,
    imgPath: `${book}`,
    category: 'Livre',
    universe: 'Japon3',
    product_creation_date: 1694495379,
  },
  {
    name: 'Carte Omanga',
    price: 1000.0,
    imgPath: `${board}`,
    category: 'Carte',
    universe: 'Japon4',
    product_creation_date: 1694395379,
  },
  {
    name: 'Statuette',
    price: 500.0,
    imgPath: `${buddha}`,
    category: 'Statuette',
    universe: 'Japon1',
    product_creation_date: 1694395379,
  },
  {
    name: 'Katana',
    price: 220.0,
    imgPath: `${katana}`,
    category: 'Arme',
    universe: 'Japon2',
    product_creation_date: 1694195379,
  },
  {
    name: 'Omanga Tome 01',
    price: 15.0,
    imgPath: `${book}`,
    category: 'Livre',
    universe: 'Japon3',
    product_creation_date: 1694295379,
  },
  {
    name: 'Carte Omanga',
    price: 11.0,
    imgPath: `${board}`,
    category: 'Carte',
    universe: 'Japon4',
    product_creation_date: 1694295379,
  },
  {
    name: 'Statuette',
    price: 120.0,
    imgPath: `${buddha}`,
    category: 'Statuette',
    universe: 'Japon1',
    product_creation_date: 1694295379,
  },
  {
    name: 'Katana',
    price: 300.0,
    imgPath: `${katana}`,
    category: 'Arme',
    universe: 'Japon2',
    product_creation_date: 1694295379,
  },
  {
    name: 'Omanga Tome 01',
    price: 10.0,
    imgPath: `${book}`,
    category: 'Livre',
    universe: 'Japon3',
    product_creation_date: 1694295379,
  },
  {
    name: 'Carte Omanga',
    price: 15.0,
    imgPath: `${board}`,
    category: 'Carte',
    universe: 'Japon4',
    product_creation_date: 1694295379,
  },
];

interface ProductsViewProps {
}

const ProductsView: React.FC<ProductsViewProps> = () => {
  const { OmangaState } = useOmangaContex();
  const classes = useStyles();
  const { productsSelectCategory, productsSelectUniverse, productSort } = OmangaState;
  const getFitleredProducts = () => {
    let filteredProducts = [...products];
    if (productsSelectCategory.length > 0) {
      filteredProducts = filteredProducts.filter(product => productsSelectCategory.includes(product.category));
    }
    if (productsSelectUniverse.length > 0) {
      filteredProducts = filteredProducts.filter(product => productsSelectUniverse.includes(product.universe));
    }
    if (productSort === 'date') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.product_creation_date - a.product_creation_date;
      });
    }
    if (productSort === 'risingPrice') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (productSort === 'decreasingPrice') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return filteredProducts;
  }

  const AllProducts = getFitleredProducts();
  console.log(AllProducts);
  return (
    <Grid container className={`${classes.productsView}`}>
      <Grid item className={`${classes.productTitle} ${classes.flexVertCenter}`}>
        <p> Découvrer les articles dans notre boutique
        </p>
      </Grid>
      <Grid container spacing={2} className={`${classes.productSelect}`}>
        <Grid item xs={4}>
          <MultipleSelect selectItems={categories} selectName={'Catégories'} type='SET_PRODUCTS_SELECT_CATEGORY' />
        </Grid>
        <Grid item xs={4}>
          <MultipleSelect selectItems={universe} selectName={'Univers'} type='SET_PRODUCTS_SELECT_UNIVERSE' />
        </Grid>
        <Grid item xs={4}>
          <SingleSelect selectItems={productsItemsSelect} selectName={'Trier par'} type='SET_PRODUCTS_SELECT_SORT' />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.productItems}>
        {
          AllProducts.map((product, index) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <ProductCard index={index} name={product.name} price={product.price} imageLink={product.imgPath} />
              </Grid>
            )
          })
        }
      </Grid>
    </Grid>
  );
};

export { ProductsView };