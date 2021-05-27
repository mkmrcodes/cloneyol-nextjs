// import { useState, useContext } from 'react';
// import BasketContext from '../../store/basket-context';
// import axios from 'axios';
// import Image from 'next/image';

// const Star = (props) => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       className='h-3 w-3'
//       viewBox='0 0 16 16'
//       fill={props.color}
//     >
//       <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
//     </svg>
//   );
// };

// const ProductDetailsPage = (props) => {
//   const basketCtx = useContext(BasketContext);

//   const { product } = props;
//   //const [quantity, setQuantity] = useState(1);
//   const quantity = 1;
//   function increment() {
//     setQuantity(quantity + 1);
//   }
//   function decrement() {
//     setQuantity(quantity - 1);
//   }
//   function basketHandler() {
//     basketCtx.addProduct(product);
//   }
//   return (
//     <div>
//       <div className={'w-full md:w-10/12 max-w-screen-xl mx-auto bg-[#F3F8FB]'}>
//         <h1 className={'py-8 text-lg text-center bg-[#F3F8FB]'}>
//           {product.name}
//         </h1>
//         <div className={'grid grid-cols-6 gap-2'}>
//           <div className={'col-start-1 col-span-3 ml-4 '}>
//             <div
//               className={
//                 'flex justify-center items-center border rounded-lg shadow-lg bg-white'
//               }
//             >
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={300}
//                 height={300}
//               />
//             </div>
//           </div>
//           <div
//             className={
//               'mr-4 col-start-4 col-span-3 bg-white border rounded-lg shadow-lg'
//             }
//           >
//             <h1 className={'text-center'}>{product.name}</h1>
//             <div className={'flex justify-start items-center ml-2'}>
//               <Star color='#FDC10D' />
//               <Star color='#FDC10D' />
//               <Star color='#FDC10D' />
//               <Star color='#FDC10D' />
//               <Star color='#D8D8D8' />
//               <p className={'pl-2 text-sm'}>121 Comments</p>
//             </div>
//             <div className={'flex items-center space-x-8 ml-2 pt-8'}>
//               <p className={'text-lg line-through text-[#808080]'}>
//                 {(
//                   (parseFloat(product.price) +
//                     (parseFloat(product.price) * 10) / 100) *
//                   quantity
//                 ).toFixed(2) + '  TL'}
//               </p>
//               <h1 className={'text-2xl font-bold text-[#FF8B39]'}>
//                 {(parseFloat(product.price) * quantity).toFixed(2)}
//                 <span className={'pl-2'}>TL</span>
//               </h1>
//             </div>
//             <div className={'flex justify-start m-4'}>
//               <div className={'flex items-center justify-center'}>
//                 <button className={'bg-red-600 py-1 px-4'} onClick={decrement}>
//                   -
//                 </button>
//                 <p className={'px-2'}>{quantity}</p>
//                 <button className={'bg-red-600 py-1 px-4'} onClick={increment}>
//                   +
//                 </button>
//               </div>
//             </div>
//             <button
//               className={
//                 'ml-2 py-2 px-4 bg-[#FF8B39] text-white font-bold tracking-wide'
//               }
//               onClick={basketHandler}
//             >
//               Sepete Ekle
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export async function getStaticProps(context) {
//   const productId = context.params.productId;
//   const response = await axios.get(
//     `http://localhost:3000/api/products/${productId}`
//   );
//   return {
//     props: {
//       product: response.data.data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const response = await axios.get(`http://localhost:3000/api/products`);
//   const paths = response.data.data.map((product) => ({
//     params: { productId: product.id.toString() },
//   }));
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

// export default ProductDetailsPage;
