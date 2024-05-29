export default searchFilterProducts = (allProducts, search) => {
    if (!search) return (allProducts);
    const tempProducts = allProducts.filter((ele) =>
      ele.commercialComponents[0].name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    console.log(tempProducts);
    return tempProducts;
  };

