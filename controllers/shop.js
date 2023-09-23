const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
 req.user.getCart()
 .then((cart)=>{
   return cart.getProducts()
 
   .then((products)=>{
    res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
   })
 })
 .catch((err)=>{console.log(err)})
 }).catch((err)=>{
  console.log(err)
 });

  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     
  //     });
  //   });
  // });
}

exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  let fetchcart;
  let newqut=1;
  req.user.getCart()
  .then((cart)=>{
    fetchcart=cart;
    return cart.getProducts({where:{id:prodId}})
  //return array
  }).then((prod)=>{
    let product;
    if(prod.length > 0){
     product= prod[0];
    }
   
    if(product){
     let oldqunt=product.cartItem.quantity;
     newqut=oldqunt+1;
     console.log(newqut)
     return product
    
    }
    console.log(newqut)
    return Product.findByPk(prodId)
  })
    .then((product)=>{
     return fetchcart.addProduct(product,{through:{quantity:newqut}})
    })
     .catch((err)=>{console.log(err)})
  


.then(()=>{
    res.redirect('/cart')
  })
  .catch((err)=> console.log(err))

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then((cart)=>{
     return cart.getProducts({where:{id:prodId}})

  }).then((prod)=>{
    const prd=prod[0];
    return prd.cartItem.destroy();
  }).then((result)=>{
    res.redirect('/cart');
  })
  .catch((err)=>{console.log(err);})
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
