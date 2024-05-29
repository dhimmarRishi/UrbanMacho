const CartProduct = ({ name, price, size, quantity, img }) => (
    <div className="flex px-4 py-2 border-b border-gray-200">
      <img
        className="w-24 h-30 object-contain mr-4"
        src={img} // Replace with image placeholder or dynamic image URL
        alt={name}
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-gray-500 text-sm">{size}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-800 font-medium">${price}</p>
          <div className="flex items-center">
            <p className="mr-2 text-gray-500">Qty:</p>
            <p className="px-2 py-1 border border-gray-200 rounded-md">{quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default CartProduct;
  