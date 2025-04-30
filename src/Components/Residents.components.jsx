import React, { useState, useEffect } from 'react';
import ResidentsHeader from './Residents_header.components';
import residentsStyle from './Residents.module.css';
import fetchWithToken from '../utils/fetchWithToken'; 

const Residents = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    selectedChoice: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filtrləri serverə göndərmək üçün POST body kimi ötür
        const data = await fetchWithToken('/resident/search',"POST", filters);
        console.log("Gələn data:", data);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Xəta:", err.message);
      }
    };

    fetchData();
  }, [filters]); // filters dəyişəndə yenidən fetch et

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setFilteredProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className={residentsStyle["residents-main"]}>
      <ResidentsHeader 
        setFilters={setFilters} 
        setFilteredProducts={setFilteredProducts}
        handleAddProduct={handleAddProduct} 
        products={products}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Mənzil</th>
            <th>Qaraj Yeri</th>
            <th>Maşın Nömrəsi</th>
            <th>Vaxt</th>
            <th>Məbləğ</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="7">Məlumat yoxdur</td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.apartmentNumber}</td>
                <td>{product.parkingPlace}</td>
                <td>{product.carNumber}</td>
                <td>{product.expiredDate}</td>
                <td>{product.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Residents;
