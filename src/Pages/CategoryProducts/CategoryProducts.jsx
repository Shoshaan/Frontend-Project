import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { API } from "../../Api/Api";
import { ProductsPreview } from "../../Components/ProductsPreview/ProductsPreview";
import { Loading } from "../../Components/Loading/Loading";
import { errorHandler } from "../../Utils/ErrorHandler";

export const CategoryProducts = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProductsByCategory() {
      try {
        setLoading(true);
        const response = await API.get(`/products/category/${slug}`);
        setProducts(response.data.products);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }

    getProductsByCategory();
  }, [slug]);

  if (loading) return <Loading />;

  return (
    <Container className="my-4">
      <h3 className="mb-4 text-capitalize">{slug.replace("-", " ")}</h3>

      <ProductsPreview products={products} />
    </Container>
  );
};
