"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Star } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { getCloudinaryUrl } from '@/utils/image'

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  nombre: string;
  empresa: string; // Asegúrate de que esto sea el nombre de la empresa
  descripcion: string;
  precio: string;
  categoria_nombre: string;
  imagen: string;
  caracteristicas: string[];
  sitio_web: string;
  rating: number;
  reviews: number;
}

interface Company {
  id: number;
  nombre: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCompany] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/productos/');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.results);
        setFilteredProducts(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/empresas/');
        if (!response.ok) throw new Error('Failed to fetch companies');
        const data = await response.json();
        setCompanies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchProducts();
    fetchCompanies();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterProducts(value, selectedCompany, selectedCategory);
  };



  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterProducts(searchTerm, selectedCompany, value);
  };

  const filterProducts = (search: string, company: string, category: string) => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.nombre.toLowerCase().includes(search) ||
        product.descripcion.toLowerCase().includes(search);
      const matchesCompany = company === 'all' || product.empresa === company; // Asegúrate de que esto coincida
      const matchesCategory = category === 'all' || product.categoria_nombre === category;
      return matchesSearch && matchesCompany && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
 <div className="text-yellow-500">
          <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1 .135 5.824 3 7.938l3-2.647z" />
          </svg>
          Cargando productos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  const categoryNames = Array.from(new Set(products.map((product) => product.categoria_nombre)));

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">
          Productos Destacados
        </h1>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/3 bg-gray-800 text-white border-gray-700 focus:ring-yellow-500"
          />
          
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-1/4 bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Seleccionar Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Categorías</SelectItem>
              {categoryNames.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
           <Card key={product.id} className="bg-gray-900 text-white shadow-lg transition-transform transform hover:scale-105 animate-fade-in-up">
           <CardHeader className="p-0">
             <div className="relative h-48 bg-primary/50 rounded-t-lg">
               <Image
                 src={getCloudinaryUrl(product.imagen)}
                 alt={product.nombre}
                 layout="fill"
                 objectFit="cover"
                 className="rounded-t-lg"
               />
             </div>
           </CardHeader>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-2">
               <CardTitle className="text-xl font-semibold">{product.nombre}</CardTitle>
               <Badge variant="secondary" className="bg-yellow-500 text-black">
                 {product.categoria_nombre}
               </Badge>
             </div>
             <div className="text-gray-400 mb-2">
             <span>{companies.find(company => company.id === Number(product.empresa))?.nombre || 'Desconocida'}</span>
             </div>
             <CardDescription className="text-gray-400 mb-4">{product.descripcion}</CardDescription>
             <div className="flex items-center gap-2 text-gray-300 mb-2">
               <ShoppingBag className="w-4 h-4" />
               <span>{product.categoria_nombre}</span>
             </div>
             <div className="flex items-center gap-1 mb-2">
               {Array.from({ length: 5 }).map((_, index) => (
                 <Star
                   key={index}
                   className={`w-4 h-4 ${
                     index < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                   }`}
                 />
               ))}
               <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
             </div>
             <p className="text-lg font-bold text-yellow-500 mb-4">{product.precio}</p>
           </CardContent>
           <CardFooter className="p-6 pt-0 flex flex-col gap-2">
           <Link
                 href={`/companies/${product.empresa}`}
                 className="block w-full text-center bg-yellow-500 text-black hover:bg-yellow-600 rounded-lg py-2  transition"
               >
                 Ir a la Empresa
               </Link>
             <div id={`details-${product.id}`} className="hidden mt-4">
               <h4 className="text-lg font-semibold text-white mb-2">Características:</h4>
               <ul className="list-disc list-inside text-gray-300 mb-4">
                 {product.caracteristicas.map((caracteristica, index) => (
                   <li key={index}>{caracteristica}</li>
                 ))}
               </ul>
               <Link
                 href={`/companies/${product.empresa}`}
                 className="block w-full text-center bg-gray-800 text-white rounded-lg py-2 hover:bg-gray-700 transition"
               >
                 Ir a la Empresa
               </Link>
             </div>
           </CardFooter>
         </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No se encontraron productos que coincidan con los criterios de búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;