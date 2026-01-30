import { useState, useEffect } from "react";
import { Carousel, Container, Button, Row, Col, Card } from "react-bootstrap";
import { Images } from "../../Constants/Images";
import { SortedProducts } from "../../Components/SortedProducts/SortedProducts";
import { errorHandler } from "../../Utils/ErrorHandler";
import { API } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { CategoriesList } from "../CategoriesList/CategoriesList";

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const displayedCategories = categories.slice(0, 6);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await API.get("/products/categories");
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
    }

    getCategories();
  }, []);
  return (
    <div>
      <Carousel className="vh-100">
        <Carousel.Item>
          <img
            src={Images.Cloths}
            alt="Cloths"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Images.Electronics}
            alt="Electronics"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Images.Shoes}
            alt="Shoes"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Images.Cosmetics}
            alt="Cosmetics"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
      </Carousel>
      <Container className="my-3">
        <h1 className="my-3">Top Rated</h1>
        <SortedProducts sortBy="rating" order="desc" />
      </Container>
      <CategoriesList categories={categories} />
    </div>
  );
};
